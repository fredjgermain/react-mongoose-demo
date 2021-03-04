import {useState} from 'react'; 
import { Groups, Predicate } from '../_arrayutils'; 

// PAGE HOOK ====================================
type I<T> = {i:number, t:T} 
export interface IPageHook<T> { 
  pageIndex:number; 
  setPageIndex:(newIndex:number)=>void; 
  page:I<T>[]; 
  pages:I<T>[][]; 
} 

export function usePage<T>(Ts:T[] = [], predicates:Predicate<T>[]|number):IPageHook<T> { 
  const iTs = Ts?.map( (t,i) => {return {i,t}}); 

  const PageCapSizePredicate = (predicates:number):Predicate<I<T>>[] => { 
    const pagecapsize = predicates > 0 ? predicates: 1; 
    return [(it:I<T>, As:I<T>[]) => As.length < pagecapsize]; 
  } 
  const PageBreakPredicates = (predicates:Predicate<T>[]):Predicate<I<T>>[] => { 
    return predicates.map( predicate => { 
      return (it:I<T>, As:I<T>[], Bs:I<T>[], Cs:I<T>[]) => { 
        return predicate(it.t, As.map( a => a.t), Bs.map( b => b.t), Cs.map( c => c.t)); 
      } 
    }) 
  } 

  const PageBreak = (typeof predicates === 'number') ? PageCapSizePredicate(predicates): PageBreakPredicates(predicates); 
  const pages = Groups(iTs, PageBreak); 
  const [pageIndex, setPageIndex] = useRange(0, pages.length-1); 
  const page:I<T>[] = pages[pageIndex] ?? []; 

  return {pageIndex, setPageIndex, page, pages}; 
}



export function useRange(from:number, to:number):[number, (newIndex:number)=>void] { 
  const [index, setIndex] = useState(from); 

  const min = Math.min(from, to); 
  const max = Math.max(from, to); 

  function SetIndex(newIndex:number) { 
    if(max >= newIndex && min <= newIndex && newIndex !== index) 
      setIndex(newIndex); 
  } 

  return [index, SetIndex]; 
}
