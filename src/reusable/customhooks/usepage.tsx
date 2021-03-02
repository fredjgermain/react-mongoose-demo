import {useState} from 'react'; 
import { Groups, Predicate } from '../_arrayutils'; 

// PAGE HOOK ====================================
type I<T> = {i:number, t:T} 
export interface IPageHook<T> { 
  pageIndex:number; 
  setPageIndex:React.Dispatch<React.SetStateAction<number>>; 
  pages:I<T>[][]; 
} 

export function usePage<T>(Ts:T[], predicates:Predicate<T>[]|number):IPageHook<T> { 
  const [pageIndex, setPageIndex] = useState(0); 
  const iTs = Ts.map( (t,i) => {return {i,t}}); 

  const PageCapSizePredicate = (predicates:number):Predicate<I<T>>[] => { 
    const pagecapsize = predicates > 0 ? predicates: 1; 
    return [(it:I<T>, i:number, As:I<T>[]) => As.length < pagecapsize]; 
  } 
  const PageBreakPredicates = (predicates:Predicate<T>[]):Predicate<I<T>>[] => { 
    return predicates.map( predicate => { 
      return (it:I<T>, i:number, As:I<T>[], Bs:I<T>[], Cs:I<T>[]) => { 
        return predicate(it.t, i, As.map( a => a.t), Bs.map( b => b.t), Cs.map( c => c.t)); 
      } 
    }) 
  } 

  const PageBreak = (typeof predicates === 'number') ? PageCapSizePredicate(predicates): PageBreakPredicates(predicates); 
  const pages = Groups(iTs, PageBreak); 
  return {pageIndex, setPageIndex, pages}; 
}


/*
export function usePage(data:any[], pageBreak:PageBreakPredicate|number):IPageHook { 
  const [pageIndex, setPageIndex] = useState(0); 

  function PageBreak(entries:Array<any>, pageBreakPredicate:PageBreakPredicate|number):number[] { 
    if(typeof pageBreakPredicate === 'number') { 
      const pagesize = pageBreakPredicate > 0 ? pageBreakPredicate: 1; 
      return PageBreak(entries, (accumulator:Array<any>):boolean => accumulator?.length >= pagesize); 
    } 
    const pageIndexes = [0]; 
    const accumulator:any[] = []; 
    for(let i=0; i<entries.length-1; i++) { 
      accumulator.push(entries[i]); 
      if(pageBreakPredicate(accumulator, entries[i], i)) { 
        pageIndexes.push(i+1); // queue starting index of next page. 
        accumulator.splice(0); 
      } 
    } 
    return pageIndexes; 
  } 

  function GetPage(entries:Array<any>, pageIndexes:number[], pageIndex:number):{from:number, to:number} { 
    const pagei = pageIndex < 0 ? 0 : Math.min(pageIndex, pageIndexes.length-1); 
    const from = pageIndexes[pagei]; 
    const to = pageIndexes[pagei+1] ?? entries.length; 
    return {from:from, to:to}; 
  } 
  const pageIndexes = PageBreak(data, pageBreak); 
  const {from, to} = GetPage(data, pageIndexes, pageIndex); 
  
  return {pageIndex, setPageIndex, pageIndexes, from, to}; 
} */
