import React, { useContext } from 'react'; 
import {QuestionnnaireContext} from '../questionnaire.page'; 
import {PageOfPages, PagerBtn, PagerFromTo} from '../../../reusable/_pager';


// PAGER ==================================================
export function Pager() { 
  const {paging} = useContext(QuestionnnaireContext); 

  return <div> 
    <BtnSubmitAnswers/> <br/> 
    <PageOfPages {...{paging}}/> <br/> 
    <PagerFromTo {...{paging}}/> <br/> 
    <PagerBtn {...{paging}} /> <br/> 
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
