import React,{useState,useEffect} from 'react';
import {useParams,Link} from 'react-router-dom';
import documentService from '../../services/documentService';
import Spinner from '../../components/common/Spinner';
import toast from 'react-hot-toast';
import {ArrowLeft , ExternalLink, LucideBadgeEuro} from 'lucide-react';
import Tabs from '../../components/common/Tabs';
import PageHeader from '../../components/common/PageHeader';
import { BASE_URL } from '../../utils/apiPaths';
import ChatInterface from '../../components/chat/ChatInterface';
import AIActions from '../../components/ai/AIActions';
import FlashcardManager from '../../components/flashcards/FlashcardManager';
import QuizManager from '../../components/quizzes/QuizManager';

const DocumentDetailPage = () => {
  
  const {id} = useParams();
  const [document,setDocument] = useState(null);
  const [loading,setLoading] = useState(true);
  const [activeTab,setActiveTab] = useState('Content');

  useEffect(()=>{
     
      const fetchDocumentDetails = async () => {
        try{
          const data = await documentService.getDocumentById(id);
          setDocument(data);
        }catch(error){
          toast.error('Failed to fetch document details');
          console.error(error);
        }finally{
          setLoading(false);
        }
      };

      fetchDocumentDetails();
  },[id]);

  const getPdfUrl = () => {
    if(!document?.data?.filePath) return null;

    const filePath = document.data.filePath;

    if(filePath.startsWith('http://') || filePath.startsWith('https://')){
      return filePath;
    }

    const baseUrl = BASE_URL;
    return `${baseUrl}${filePath.startsWith('/')?'':'/'}${filePath}`;
  };

  const renderContent = () => {
    if(loading){
      return <Spinner/>
    }
    if(!document || !document.data || !document.data.filePath){
      return <div className='text-center p-8'>PDF not available</div>
    }

    const pdfUrl = getPdfUrl();

    return (
      <div className='card overflow-hidden' >
          <div className='flex items-center justify-between p-4 bg-slate-50/80 border-b border-slate-200/70'>
            <span className='text-sm font-medium text-slate-700'>Document Viewer</span>
            <a
            href={pdfUrl}
            target='_blank'
            rel='noopener noreferrer'
            className='inline-flex items-center gap-1.5 text-sm text-brand-600 hover:text-brand-700 font-medium transition-colors'
            >
            <ExternalLink size={16}/>
            Open in new tab
            </a>
          </div>
          <div className='bg-slate-100 p-1'>
            <iframe
            src={pdfUrl}
            className='w-full h-[70vh] bg-white rounded-xl border border-slate-200/70'
            title='PDF Viewer'
            style={{
              colorScheme: 'light'
            }}
            />
          </div>
      </div>
    );
  };

  const renderChat = () => {
    return <ChatInterface/>
  };

  const renderAIActions = () => {
    return <AIActions/>
  };

  const renderFlashcardsTab = () => {
    return <FlashcardManager documentId={id}/>
  };

  const renderQuizzesTab = () => {
    return <QuizManager documentId={id}/>
  };

  const tabs = [
    {name: 'Content', label: 'Content' , content: renderContent()},
    {name: 'Chat', label: 'Chat' , content: renderChat()},
    {name: 'AI Actions', label: 'AI Actions' , content: renderAIActions()},
    {name: 'Flashcards', label: 'Flashcards' , content: renderFlashcardsTab()},
    {name: 'Quizzes', label: 'Quizzes' , content: renderQuizzesTab()},
  ];

  if(loading){
    return <Spinner/>;
  }

  if(!document){
    return <div className='text-center p-8'>Document not found</div>;
  }

  return (
    <div>
      <div className='mb-4'>
         <Link to="/documents" className='inline-flex items-center gap-2 text-sm text-slate-600 hover:text-brand-600 transition-colors'>
            <ArrowLeft size={16}/>
            Back To Documents
         </Link>
      </div>
      <PageHeader title={document.data.title}/>
      <Tabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab}/>
    </div>
  )
}

export default DocumentDetailPage;