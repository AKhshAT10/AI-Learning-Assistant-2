import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

if(!process.env.GEMINI_API_KEY){
    console.error('FATAL ERROR: GEMINI_API_KEY is not set in the environment variables');
    process.exit(1);
}

const ai = new GoogleGenAI({apiKey: process.env.GEMINI_API_KEY});

/**
 * Ordered list of models to try. Override with GEMINI_MODEL in .env
 * (comma-separated). The first is used first; if it is overloaded the
 * next is tried as a fallback.
 */
const MODELS = (process.env.GEMINI_MODEL || 'gemini-2.5-flash,gemini-2.0-flash')
    .split(',')
    .map((m) => m.trim())
    .filter(Boolean);

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// 503 (overloaded), 429 (rate limited) and 500 are transient - worth retrying.
const isTransient = (error) => {
    const status = error?.status ?? error?.code;
    return status === 503 || status === 429 || status === 500;
};

/**
 * Call Gemini with automatic backoff retries and model fallback.
 * Retries transient errors, then moves on to the next model in MODELS.
 * @param {string|Array} contents - prompt string or SDK contents array
 * @param {{maxRetries?: number}} [opts]
 * @returns {Promise<string>} the generated text
 */
const generate = async (contents, { maxRetries = 4 } = {}) => {
    let lastError;

    for (const model of MODELS) {
        for (let attempt = 0; attempt <= maxRetries; attempt++) {
            try {
                const response = await ai.models.generateContent({ model, contents });
                const text = response.text;
                if (!text) throw new Error('Empty response from Gemini');
                return text;
            } catch (error) {
                lastError = error;

                // Non-transient (bad key, invalid request, etc.) - fail fast.
                if (!isTransient(error)) throw error;

                if (attempt < maxRetries) {
                    const delay = Math.min(1000 * 2 ** attempt, 8000) + Math.floor(Math.random() * 400);
                    console.warn(
                        `Gemini "${model}" ${error?.status ?? ''} overloaded - retry ${attempt + 1}/${maxRetries} in ${delay}ms`
                    );
                    await sleep(delay);
                }
            }
        }
        console.warn(`Gemini "${model}" exhausted retries; trying next fallback model if available.`);
    }

    throw lastError;
};

/**
 * generate flashcards from text
 * @param {string} text - Document Text
 * @param {number} count - Number of flashcards to generate
 * @returns {Promise<Array<{question: string, answer: string, difficulty: string}>>}
 */
export const generateFlashcards = async (text,count = 10) => {
    const prompt = `Generate exactly ${count} educational flashcards from the following text.
    Format each flashcard as:
    Q: [Clear,specific questions]
    A: [Concise,accurate answer]
    D: [Difficulty level: easy,medium, or hard]

    Seperate each flashcard with "---"

    Text:
    ${text.substring(0,15000)}`;

    try{
        const generateText = await generate(prompt);

        //Parse the response
        const flashcards = [];
        const cards = generateText.split('---').filter(c => c.trim());

        for(const card of cards){
            const lines = card.trim().split('\n');
            let question = '',answer = '',difficulty = 'medium';

            for(const line of lines){
                if(line.startsWith('Q:')){
                    question = line.substring(2).trim();
                }
                else if(line.startsWith('A:')){
                    answer = line.substring(2).trim();
                }
                else if(line.startsWith('D:')){
                    const diff = line.substring(2).trim().toLowerCase();
                    if(['easy','medium','hard'].includes(diff)){
                        difficulty = diff;
                    }
                }
            }
            if(question && answer){
                flashcards.push({question,answer,difficulty});
            }
        }
        return flashcards.slice(0,count);
    }catch(error){
        console.error('Gemini API error:',error);
        throw new Error('Failed to generate flashcards');
    }
};

/**
 * @param {string} text -document text
 * @param {number} nunQuestions - number of questions
 * @returns {Promise<Array<{question: string, options: Array, correctAnswer: string, explanation: string, difficulty: string}>>}
 */

export const generateQuiz = async (text,numQuestions = 5) => {
    const prompt = `Generate exactly ${numQuestions} multiple choice questions from the following text.
    Format each question as:
    Q: [Question]
    O1: [Option 1]
    O2: [Option 2]
    O3: [Option 3]
    O4: [Option 4]
    C: [Correct option - exactly as written above]
    E: [Brief explanation]
    D: [Difficulty: easy,medium, or hard]

    Seperate Questions with "---"

    Text:
    ${text.substring(0,15000)}`;

    try{
        const generateText = await generate(prompt);

        const questions = [];
        const questionBlocks = generateText.split('---').filter(q=>q.trim());

        for(const block of questionBlocks){
            const lines = block.trim().split('\n');
            let question = '',options = [], correctAnswer = '', explanation = '',difficulty = 'medium';

            for(const line of lines){
                const trimmed = line.trim();
                if(trimmed.startsWith('Q:')){
                    question = trimmed.substring(2).trim();
                }else if(trimmed.match(/^O\d:/)){
                    options.push(trimmed.substring(3).trim());
                }else if(trimmed.startsWith('C:')){
                    correctAnswer = trimmed.substring(2).trim();
                }else if(trimmed.startsWith('E:')){
                    explanation = trimmed.substring(2).trim();
                }else if(trimmed.startsWith('D:')){
                    const diff = trimmed.substring(2).trim().toLowerCase();
                    if(['easy','medium','hard'].includes(diff)){
                        difficulty = diff;
                    }
                }
            }
            if(question && options.length === 4 && correctAnswer){
                questions.push({question, options, correctAnswer, explanation, difficulty});
            }
        }
        return questions.slice(0,numQuestions);
    }catch(error){
        console.error('Gemini API error:',error);
        throw new Error('Failed to generate quiz');
    }
};

export const generateSummary = async (text) => {
    const prompt = `Provide a concise summary of the following text, highlighting the key concepts, main ideas and important points. Keep the summary clear and structured.

Text:
${text.substring(0, 20000)}`;

    try {
        return await generate(prompt);
    } catch (error) {
        console.error("Gemini API Error:", error);
        throw new Error("Failed to generate summary");
    }
};
/**
 * chat with document context
 * @param {string} question - user question
 * @param {Array<Object>} chunks - relevant document chunks
 * @returns {Promise<string>}
 */
export const chatWithContext = async (question,chunks) => {
    const context = chunks.map((c,i)=>`[Chunk ${i+1}]\n${c.content}`).join('\n\n');

    const prompt = `Based on the following context from a document, analyse the context and answer the user's questions , if the answer is not in the context say so

    Context:
    ${context}

    Question: ${question}

    Answer:`;

    try{
       return await generate(prompt);
    }catch(error){
       console.error('Gemini API error',error);
       throw new Error('Failed to process chat request');
    }
};

/**
 * explain a specific concept
 * @param {string} concept - concept to explain
 * @param {string} context - relevant context
 * @returns {Promise<string>}
 */

export const explainConcept = async (concept,context) => {
    const prompt = `Explain the concept of "${concept}" based on the following context.
    provide a clear , educational explanaton thats easy to understand.
    include examples if relevant.

    Context:
    ${context.substring(0,10000)}`;

    try{
        return await generate(prompt);
    }catch(error){
        console.error('Gemini API Error:',error);
        throw new Error('Failed to explain concept');
    }
};
