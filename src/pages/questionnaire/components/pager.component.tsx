import React, { useContext } from 'react'; 
import {QuestionnnaireContext} from '../questionnaire.page'; 
import { IPageHook, usePage } from '../../../reusable/_customhooks'; 
import {Filter, HeadMidTail, Sort} from '../../../reusable/_arrayutils';
import { IsNull } from '../../../reusable/_utils';
import {PageOfPages, PagerBtn, PagerFromTo} from '../../../reusable/_pager';


// PAGER ==================================================
export function Pager() { 
  const {paging, AnswersAreComplete, SubmitQuestionnaire} = useContext(QuestionnnaireContext); 
  const {page, pageIndex, pages, setPageIndex} = paging; 
  
  const pageIsComplete = AnswersAreComplete(page.map(ia => ia.t)); 
  const formIsComplete = AnswersAreComplete(); 

  console.log([pageIsComplete, formIsComplete]); 

  async function SubmitAnswersAndNextPage () { 
    await SubmitQuestionnaire(page.map(ia => ia.t)) 
    setPageIndex(pageIndex+1) 
  }

  return <div> 
    <PageOfPages {...{paging}}/> <br/>
    <PagerFromTo {...{paging}}/> <br/>
    <PagerBtn {...{paging}} /> <br/> 
    <BtnSubmitAnswers/> <br/> 
  </div> 
} 






// Butonn Submit Answers =========================================
export function BtnSubmitAnswers() { 
  const {paging, AnswersAreComplete, SubmitQuestionnaire} = useContext(QuestionnnaireContext); 
  const {page, pageIndex, pages, setPageIndex} = paging; 
  const pageIsComplete = AnswersAreComplete(page.map(ia => ia.t)); 
  const formIsComplete = AnswersAreComplete(); 

  async function SubmitAnswersAndNextPage () { 
    await SubmitQuestionnaire(page.map(ia => ia.t)) 
    setPageIndex(pageIndex+1) 
  }

  return <div> 
    {formIsComplete ? 
      <button onClick={() => SubmitQuestionnaire()} disabled={!formIsComplete}>Submit</button>: 
      <button onClick={() => SubmitAnswersAndNextPage()} disabled={!pageIsComplete} >Next</button> 
    } 
  </div> 
}
