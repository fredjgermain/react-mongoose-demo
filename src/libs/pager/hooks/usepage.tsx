import {useState} from 'react'; 
import { Group, Predicate } from '../../_arrayutils'; 

// PAGE HOOK ====================================
type I<T> = {i:number, t:T} 
export interface IPageHook<T> { 
  pageIndex:number; 
  setPageIndex:(newIndex:number)=>void; 
  page:I<T>[]; 
  pages:I<T>[][]; 
} 

export function usePage<T>(Ts:T[] = [], grouping:Predicate<T>|number):IPageHook<T> { 
  const pages = Paging(Ts, grouping); 
  const [pageIndex, setPageIndex] = useRange(0, pages.length-1); 
  const page:I<T>[] = pages[pageIndex] ?? []; 
  return {pageIndex, setPageIndex, page, pages}; 
}

function Paging<T>(Ts:T[] = [], grouping:Predicate<T>|number) { 
  const iTs = Ts.map( (t, i) => { 
    return {i, t} as I<T>; 
  }); 
  const predicate = PagingPredicate(grouping); 
  return Group(iTs, predicate); 
}

function PagingPredicate<T>(grouping:Predicate<T>|number): Predicate<I<T>> { 
  if(typeof grouping === 'number') 
    return PagingPredicate( (t:T, i, a:T[], positive:T[]) => positive.length < grouping); 
  const GetT = (e:I<T>) => e.t; 
  return (it:I<T>, i:number, a:I<T>[], positive:I<T>[], negative:I<T>[]) => { 
    return grouping(it.t, i, a.map(GetT), positive.map(GetT), negative.map(GetT)); 
  } 
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
