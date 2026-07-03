import React from 'react';
import {useNavigate} from 'react-router-dom';
import { BookOpen,Sparkles,TrendingUp } from 'lucide-react';
import moment from 'moment';

const FlashcardSetCard = ({flashcardSet}) => {

    const navigate = useNavigate();

    const handleStudyNow = () => {
        navigate(`/documents/${flashcardSet.documentId._id}/flashcards`);
    };

    const reviewedCount = flashcardSet.cards.filter(card=>card.lastReviewed).length;
    const totalCards = flashcardSet.cards.length;
    const progressPercentage = totalCards > 0 ? Math.round((reviewedCount/totalCards)*100) : 0;


    return (
        <div
        className='group card card-hover p-6 flex flex-col justify-between cursor-pointer'
        onClick={handleStudyNow}
        >
           <div className='space-y-4'>
              {/*Icon and Title*/}
              <div className='flex items-start gap-4'>
                 <div className='shrink-0 w-12 h-12 rounded-xl bg-linear-to-br from-brand-100 to-brand-50 flex items-center justify-center'>
                    <BookOpen className='w-6 h-6 text-brand-600' strokeWidth={2}/>
                 </div>
                 <div className='flex-1 min-w-0'>
                   <h3 className='text-base font-semibold text-slate-900 line-clamp-2 mb-1' title={flashcardSet?.documentId?.title}>
                    {flashcardSet?.documentId?.title}
                   </h3>
                   <p className='text-xs font-medium text-slate-500 uppercase tracking-wide'>
                      Created {moment(flashcardSet.createdAt).fromNow()}
                   </p>
                 </div>
              </div>

              {/*Stats*/}
              <div className='flex items-center gap-3 pt-2'>
                 <div className='px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg'>
                    <span className='text-sm font-semibold text-slate-700'>
                        {totalCards}{' '}{totalCards===1 ? 'Card' : 'Cards'}
                    </span>
                 </div>
                 {reviewedCount > 0 && (
                    <div className='flex items-center gap-1.5 px-3 py-1.5 bg-brand-50 border border-brand-200 rounded-lg'>
                       <TrendingUp className='w-3.5 h-3.5 text-brand-600' strokeWidth={2.5}/>
                       <span className='text-sm font-semibold text-brand-700'>
                        {progressPercentage}%
                       </span>
                    </div>
                 )}
              </div>

              {/*Progress Bar*/}
              {totalCards > 0 && (
                <div className='space-y-2'>
                    <div className='flex items-center justify-between'>
                        <span className='text-xs font-medium text-slate-600'>Progress</span>
                        <span className='text-xs font-semibold text-slate-700'>
                            {reviewedCount}/{totalCards} reviewed
                        </span>
                    </div>
                    <div className='relative h-2 bg-slate-100 rounded-full overflow-hidden'>
                        <div
                        className='absolute inset-y-0 left-0 bg-linear-to-r from-brand-500 to-brand-teal rounded-full transition-all duration-500 ease-out'
                        style={{width: `${progressPercentage}%`}}
                        />
                    </div>
                </div>
              )}
           </div>

           {/*Study Button*/}
           <div className='mt-6 pt-4 border-t border-slate-100'>
               <button
               onClick={(e)=>{
                  e.stopPropagation();
                  handleStudyNow();
               }}
               className='group/btn relative w-full h-11 bg-linear-to-r from-brand-50 to-brand-100 hover:from-brand-500 hover:to-brand-teal text-brand-700 hover:text-white font-semibold text-sm rounded-xl transition-all duration-200 active:scale-95 overflow-hidden'
               >
                <span className='relative z-10 flex items-center justify-center gap-2'>
                   <Sparkles className='w-4 h-4' strokeWidth={2.5}/>
                   Study Now
                </span>
                <div className='absolute inset-0 bg-linear-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700'/>
               </button>
           </div>
        </div>
    )
}

export default FlashcardSetCard;