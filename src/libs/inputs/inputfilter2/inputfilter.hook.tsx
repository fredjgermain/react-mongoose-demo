import { useState } from 'react'; 
import { Filter, Predicate } from '../../_arrayutils'; 
import { FilterPredicate } from './inputfilter.utils'; 
import { IUseFilter } from './inputfilter.type'; 



export function useFilter<T>(values:T[]):IUseFilter<T> { 
  const [keyFilters, setFilters, ResetFilters] = usePredicates<string, Predicate<T>>(); 

  const SetFilters = (strPredicate:string, type:string, keys:string[]) => {
    const Key = keys.reduce((prev, current) => prev+current); 
    const newFilter = FilterPredicate(strPredicate, type, keys); 
    setFilters(Key, newFilter); 
  } 

  const filters = (t: T, i: number, a: T[], positive: T[], negative: T[]) => { 
    return keyFilters.map( f => f[1] ).every( f => f(t, i, a, positive, negative) ); 
  } 
  const [matchValues, unmatchValues] = Filter(values, filters); 
  return {values, matchValues, unmatchValues, SetFilters, ResetFilters} 
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

