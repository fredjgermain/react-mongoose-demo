import {useState} from 'react'; 
import { Groups, Sorter, BreakAt, Predicate } from '../_arrayutils'; 

// PAGE HOOK ====================================
type I<T> = {i:number, t:T} 
export interface IPageHook<T> { 
  pageIndex:number; 
  setPageIndex:(newIndex:number)=>void; 
  page:I<T>[]; 
  pages:I<T>[][]; 
} 

export function usePage<T>(Ts:T[] = [], pageCap:number, grouping?:Sorter<T>[]):IPageHook<T> { 
  const pages = Paging(Ts, pageCap, grouping); 
  const [pageIndex, setPageIndex] = useRange(0, pages.length-1); 
  const page:I<T>[] = pages[pageIndex] ?? []; 
  return {pageIndex, setPageIndex, page, pages}; 
}

function Paging<T>(Ts:T[], pageCap:number, grouping?:Sorter<T>[]): I<T>[][] {
  const groups = Grouping(Ts, grouping); 
  let pages = [] as I<T>[][]; 
  const predicate:Predicate<I<T>> = (it, i) => i >= 5; 
  groups.forEach( group => { 
    pages = [...pages, ...BreakAt(group, predicate)]; 
  }) 
  return pages; 
}

function Grouping<T>(Ts:T[], grouping?:Sorter<T>[]): I<T>[][] { 
  const iTs:I<T>[] = Ts?.map( (t,i) => {return {i,t}}); 
  const _grouping:Sorter<I<T>>[] = grouping ? 
    grouping?.map( group => { return (it:I<T>, pivot:I<T>) => group(it.t, pivot.t)}): []; 
  return Groups<I<T>>(iTs, _grouping); 
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
