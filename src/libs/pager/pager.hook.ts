import { useRange } from '../_customhooks'; 
import { Predicate } from '../_arrayutils'; 
import { Paging } from './pager.utils'; 


export function usePager<T>(ts:T[], pageBreak:Predicate<T>|number) { 
  const pages = Paging(ts, pageBreak); 
  const [pageIndex, setPageIndex] = useRange(0, pages.length-1); 
  const page = pages[pageIndex] ?? []; 
  return {page, pages, pageIndex, setPageIndex} 
} 



