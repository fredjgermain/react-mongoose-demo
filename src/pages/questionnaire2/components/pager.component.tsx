import React, { useContext } from 'react'; 
import {QuestionnnaireContext} from '../questionnaire.page'; 


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
    {pages.map( (p,i) => { 
      return <button key={i} onClick={() => setPageIndex(i)} disabled={i===pageIndex}>{i+1}</button> 
    })} 
    <BtnSubmitAnswers/> 
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