import { Group, Predicate } from '../_arrayutils'; 

export function Paging<T>(ts:T[], pageBreak:Predicate<T>|number):T[][] { 
  const _pageBreak = PagingPredicate(pageBreak); 
  return Group(ts, _pageBreak); 
} 

function PagingPredicate<T>(pageBreak:Predicate<T>|number): Predicate<T> { 
  if(typeof pageBreak === 'number') 
    return PagingPredicate( (t:T, i, a:T[], positive:T[]) => positive.length < pageBreak); 
  return pageBreak; 
} 