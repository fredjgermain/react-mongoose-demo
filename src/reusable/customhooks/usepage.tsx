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

