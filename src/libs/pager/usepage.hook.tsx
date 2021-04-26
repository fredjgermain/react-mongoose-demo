import { Group, Predicate } from '../_arrayutils'; 
import { useRange } from '../_customhooks'; 
import { I, IPageHook } from './pager.type'; 

// PAGE HOOK ====================================
export function usePage<T>(Ts:T[] = [], pageBreak:Predicate<T>|number):IPageHook<T> { 
  const pages = Paging(Ts, pageBreak); 
  const [pageIndex, setPageIndex] = useRange(0, pages.length-1); 
  const page:I<T>[] = pages[pageIndex] ?? []; 
  return {pageIndex, setPageIndex, page, pages}; 
}

function Paging<T>(Ts:T[] = [], pageBreak:Predicate<T>|number) { 
  const iTs = Ts.map( (t, i) => { 
    return {i, t} as I<T>; 
  }); 
  const predicate = PagingPredicate(pageBreak); 
  return Group(iTs, predicate); 
}

function PagingPredicate<T>(pageBreak:Predicate<T>|number): Predicate<I<T>> { 
  if(typeof pageBreak === 'number') 
    return PagingPredicate( (t:T, i, a:T[], positive:T[]) => positive.length < pageBreak); 
  const GetT = (e:I<T>) => e.t; 
  return (it:I<T>, i:number, a:I<T>[], positive:I<T>[], negative:I<T>[]) => { 
    return pageBreak(it.t, i, a.map(GetT), positive.map(GetT), negative.map(GetT)); 
  } 
} 

