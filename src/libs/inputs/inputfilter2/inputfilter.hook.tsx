import { useState } from 'react'; 
import { Filter, Predicate } from '../../_arrayutils'; 
import { FilterPredicate } from './inputfilter.utils'; 
import { IUseFilter } from './inputfilter.type'; 



export function useFilter<T>(values:T[]):IUseFilter<T> { 
  const [activeFilters, setFilters, ResetFilters] = usePredicates<string, Predicate<T>>(); 

  function SetFilters (strPredicate:string, type:string, keys:string[]) {
    const Key = keys.reduce((prev, current) => prev+current); 
    const newFilter = FilterPredicate<T>(strPredicate, type, keys); 
    setFilters(Key, newFilter); 
  } 

  const predicate = (t: T, i: number, a: T[], positive: T[], negative: T[]) => { 
    return activeFilters.map( f => f[1] ).every( f => f(t, i, a, positive, negative) ); 
  } 
  const [matchValues, unmatchValues] = Filter(values, predicate); 

  function ExpectedResults(strPredicate:string, type:string, keys:string[]) {
    const Key = keys.reduce((prev, current) => prev+current); 
    const newFilter = FilterPredicate<T>(strPredicate, type, keys); 
    
    const predicate = (t: T, i: number, a: T[], positive: T[], negative: T[]) => { 
      const newKeyFilter = [Key, newFilter] as [string, Predicate<T>]; 
      const testedFilters = [...activeFilters, newKeyFilter]; 
      return testedFilters.map( f => f[1] ).every( f => f(t, i, a, positive, negative) ); 
    } 
    const [results] = Filter(values, predicate); 
    return results;
  }


  return {values, matchValues, ExpectedResults, unmatchValues, SetFilters, ResetFilters} 
}









export function usePredicates<K, P>(): [ 
    [K, P][], 
    (key:K, newPredicate?:P) => void, 
    () => void, 
  ] { 
  const [predicates, setPredicates] = useState([] as [K, P][]); 

  function SetPredicates(key:K, newPredicate?:P) { 
    setPredicates( prev => { 
      const rest = prev.filter(kp => key != kp[0]); 
      return newPredicate ? 
        [...rest, [key, newPredicate]]: 
        [...rest]; 
    }) 
  } 

  function ResetPredicates() { 
    setPredicates([] as [K, P][]) 
  }; 

  return [predicates, SetPredicates, ResetPredicates]; 
}

