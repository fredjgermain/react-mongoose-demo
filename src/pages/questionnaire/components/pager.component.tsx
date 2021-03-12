import React, { useContext } from 'react'; 
import {QuestionnnaireContext} from '../questionnaire.page'; 
import {PageOfPages, PagerBtn, PagerFromTo} from '../../../reusable/_pager';
import { feedback } from '../../../components/feedback/feedback.component';


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
    
  }

  async function SubmitAnswersFinal() { 
    const responses = await SubmitQuestionnaire(); 
    if(responses.every( r => r.success )) 
      feedback.setValue(responses); // success 
    else 
      feedback.setValue(responses); // failure 
  }

  return <div> 
    {formIsComplete ? 
      <button onClick={() => SubmitAnswersFinal()} disabled={!formIsComplete}>Submit</button>: 
      <button onClick={() => setPageIndex(pageIndex+1)} disabled={!pageIsComplete} >Next</button> 
    } 
  </div> 
}
