import React from 'react';
import {Link} from 'react-router-dom';
import {Play,BarChart2,Trash2,Award} from 'lucide-react';
import moment from 'moment';

const QuizCard = ({quiz,onDelete}) => {
    return  (
        <div className='group card card-hover p-5 flex flex-col justify-between'>
            
            <button
            onClick={(e)=>{
                e.stopPropagation();
                onDelete(quiz);
            }}
            className='absolute top-4 right-4 p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-all duration-200 opacity-0 group-hover:opacity-100'
            >
              <Trash2 className='w-4 h-4'/>
            </button>

            <div className='space-y-4'>
                 
                 <div className='inline-flex items-center gap-1.5 py-1 rounded-lg text-xs font-semibold'>
                   <div className='flex items-center gap-1.5 bg-brand-50 border border-brand-200 rounded-lg px-3 py-1'>
                       <Award className='w-3.5 h-3.5 text-brand-600' strokeWidth={2.5}/>
                       <span className='text-brand-700'>Score: {quiz?.score}</span>
                   </div>
                 </div>

                 <div>
                    <h3 className='text-base font-semibold text-slate-900 mb-1 line-clamp-2' title={quiz.title}>
                      {quiz.title || `Quiz - ${moment(quiz.createdAt).format("MM D, YYYY")}`}
                    </h3>

                    <p className='text-xs font-medium text-slate-500 uppercase tracking-wide'>
                       Created {moment(quiz.createdAt).format("MMM D, YYYY")}
                    </p>
                 </div>

                 <div className='flex items-center gap-3 pt-2 border-t border-slate-100'>
                    <div className='px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg'>
                       <span className='text-sm font-semibold text-slate-700'>
                          {/* ✅ FIXED HERE */}
                          {quiz?.questions?.length || 0}{" "}
                          {quiz?.questions?.length === 1 ? "Question" : "Questions"}
                       </span>
                    </div>
                 </div>
            </div>

            <div className='mt-2 pt-4 border-t border-slate-100'>
                {quiz?.userAnswers?.length > 0 ? (
                    <Link to={`/quizzes/${quiz._id}/results`}>
                      <button className='group/btn w-full inline-flex items-center justify-center gap-2 h-11 bg-brand-50 hover:bg-brand-100 text-brand-700 border border-brand-200 font-semibold text-sm rounded-xl transition-all duration-200 active:scale-95 cursor-pointer'>
                        <BarChart2 className='w-4 h-4' strokeWidth={2.5}/>
                        View Results
                      </button>
                    </Link>
                ) : (
                 <Link to={`/quizzes/${quiz._id}`}>
                    <button className='group/btn relative w-full h-11 bg-linear-to-r from-brand-500 to-brand-teal hover:from-brand-600 hover:to-brand-teal text-white font-semibold text-sm rounded-xl transition-all duration-200 shadow-lg shadow-brand-500/25 active:scale-95 overflow-hidden'>
                       <span className='relative z-10 flex items-center justify-center gap-2'>
                          <Play className='w-4 h-4' strokeWidth={2.5}/>
                          Start Quiz
                       </span>
                       <div className='absolute inset-0 bg-linear-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700'/>
                    </button>
                 </Link>
                )}
            </div>
        </div>
    )
}

export default QuizCard;