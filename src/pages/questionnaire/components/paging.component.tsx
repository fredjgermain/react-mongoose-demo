import {useContext} from 'react'; 
import { CrudContext } from '../../../reusable/_crud';
import {AnswersContext} from '../questionnaire.page'; 
import {IPageHook} from '../../../reusable/_usepage'; 


// PAGE BREAKER ==================================
export function PageBreaker() { 
  const {answers} = useContext(AnswersContext); 
  const {GetIEntries} = useContext(CrudContext); 

  function PageBreak(accumulator:Array<any>, value?:any, index?:number):boolean { 
    const [prevAnswer] = accumulator as IAnswer[]; 
    const answer = value as IAnswer; 
    const [prevQuestion] = GetIEntries('questions', [prevAnswer.qid]) as IQuestion[]; 
    const [question] = GetIEntries('questions', [answer.qid]) as IQuestion[]; 
    //const prevQuestion = prevAnswer ? GetIEntries('questions', [answer.qid]) as IQuestion[]; : question; 

    if(accumulator.length >= 4) 
      return true; 
    if(question.form !== prevQuestion.form) 
      return true; 
    if(JSON.stringify(question.instructions) !== JSON.stringify(prevQuestion.instructions)) 
      return true; 
    return false; 
  } 
  return PageBreak; 
} 


// PAGING =======================================
export function Paging({pageIndex, setPageIndex, pages}:IPageHook) { 
  const {activeCollection:{accessor}, Create} = useContext(CrudContext); 
  const page = pages[pageIndex] ?? []; 
  const isComplete = IsComplete(page); 
  const allComplete = IsComplete(); 
  const [from, to] = [ [...page].shift(), [...page].pop()]; 
  const [first, last] = [pages.flat().shift(), pages.flat().pop()]; 

  const onClickNext = () => {setPageIndex(pageIndex+1)}; 
  const onClickSubmit = () => {console.log('submit answers')}; 
  //const onClickSubmit = () => {Create(accessor, )}; 

  return <div>
    <span>page : {pageIndex+1} of {pages.length}</span>
    <div>{(from??0) +1} - {(to??0)+1} of {(first??0)+1} - {(last??0)+1}</div>
    {pages.map( (p:number[], i:number) => { 
      const onClick = () => {setPageIndex(i)} 
      const disabled = pageIndex === i; 
      return <button key={i} {...{onClick, disabled}} >{i+1}</button> 
    })} 
    <button {...{onClick:onClickNext, disabled:isComplete}} >Next</button> 
    <button {...{onClick:onClickSubmit, disabled:allComplete}} >Submit</button> 
  </div> 
} 


export function IsComplete(page?:number[]) { 
  const {answers} = useContext(AnswersContext); 
  const {GetIEntries} = useContext(CrudContext); 

  const indexes = page ? page : answers.map( (e,i) => i); 
  const isIncomplete = indexes.some( i => { 
    const answer = answers[i]; 
    const [question] = GetIEntries('questions', [answer.qid]); 
    return answer.answer < 0 && !question.optional; 
  }); 
  return isIncomplete; 
} 
