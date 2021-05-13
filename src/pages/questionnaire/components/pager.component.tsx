import React, { useContext } from 'react'; 
import { QuestionnaireContext } from '../questionnaire.page'; 
import {PageOfPages, PagerBtn} from '../../../libs/pager/_pager';



// PAGER ==================================================
export function Pager() { 
  const {paging} = useContext(QuestionnaireContext); 

  return <div> 
    <BtnSubmitAnswers/> <br/> 
    <PageOfPages {...{paging}}/> <br/> 
    <PagerBtn {...{paging}} /> <br/> 
  </div> 
} 






// Butonn Submit Answers =========================================
export function BtnSubmitAnswers() { 
  const {paging, feedBack, SetFeedback, AnswersAreComplete, SubmitQuestionnaire} = useContext(QuestionnaireContext); 
  const {page, pageIndex, pages, setPageIndex} = paging; 
  const pageIsComplete = AnswersAreComplete(page); 
  const formIsComplete = AnswersAreComplete(); 

  async function SubmitAnswersFinal() { 
    const responses = await SubmitQuestionnaire(); 
    SetFeedback(responses); // success 
  } 

  return <div> 
    {formIsComplete ? 
      <button onClick={() => SubmitAnswersFinal()} disabled={!formIsComplete}>Submit</button>: 
      <button onClick={() => setPageIndex(pageIndex+1)} disabled={!pageIsComplete} >Next</button> 
    } 
  </div> 
} 
