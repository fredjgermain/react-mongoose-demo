import React, { useContext } from 'react'; 
import {QuestionnnaireContext} from '../questionnaire.page'; 
import { IPageHook, usePage } from '../../../reusable/_customhooks'; 
import {Filter, HeadMidTail} from '../../../reusable/_arrayutils';
import { IsNull } from '../../../reusable/_utils';


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
    <TestPagerBtn {...{paging}} /> 
  </div> 
} 


export function PagerFromTo<T>({paging:{pageIndex, setPageIndex, page, pages}}:{paging:IPageHook<T>}) { 
  const indexes = page?.map(p=>p.i) ?? []; 
  let [from, a, mid, b, to] = HeadMidTail(indexes); 
  from = !IsNull(from) ? from+1: 0; 
  to = !IsNull(to) ? to+1: from; 
  //const indexes.length-1; 
  return <span> 
    {from === to ? 
      <span>Item #{from}</span>: 
      <span>Items #{from} to {to}</span>} 
  </span> 
} 

export function PageOfPages<T>({paging:{pageIndex, setPageIndex, page, pages}}:{paging:IPageHook<T>}) { 
  return <span>Page {pageIndex+1} of {pages?.length ?? 0}</span> 
} 

export function PagerBtn<T>({paging:{pageIndex, setPageIndex, page, pages}}:{paging:IPageHook<T>}) { 
  let indexes = pages.map( (p,i) => i); 
  if(indexes.length > 10) 
    indexes = AbbrevIndexes(pageIndex, indexes); 

  return <span> 
    {indexes.map( (index, i) => { 
      return <span key={index}> 
        <button onClick={() => setPageIndex(index)} disabled={index===pageIndex}>{index+1}</button> 
        {index + 1 !== indexes[i+1] && i < indexes.length-1 && '...'} 
      </span> 
    })} 
  </span> 
} 


export function TestPagerBtn<T>({paging:{pageIndex, setPageIndex, page, pages}}:{paging:IPageHook<T>}) { 
  let items = [] as number[]; 
  while(items.length < 100) 
    items.push(items.length); 

  const paging = usePage(items, 5); 

  return <div> 
      {JSON.stringify(paging.page)} <br/>
      <PagerBtn {...{paging}}/> 
    </div> 
} 


function AbbrevIndexes(index:number, indexes:number[]) { 
  const [firstHalf, remainder] = Filter(indexes, (n:number, firstHalf:number[]) => firstHalf.length < index); 
  const [current, ...secondHalf] = remainder; 

  const [first, fistLeft, firstQuart, firstRight, prev] = HeadMidTail(firstHalf); 
  const [next, secondLeft, secondQuart, secondRight, last] = HeadMidTail(secondHalf); 
  
  const abbrevIndexes = [ 
    first, first+1, firstQuart, 
    prev-1, prev, current, next, next+1, 
    secondQuart, last-1, last]; 
  const [abbrev] = Filter(abbrevIndexes, (i:number, positive:number[]) => { 
    return !IsNull(i) && !positive.includes(i) && i>=0 && i < indexes.length; 
  }) 
  return abbrev; 
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