import { useState } from 'react'; 
import { Filter, Predicate } from '../../_arrayutils'; 



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


export function useFilter<T>(values:T[]) { 
  const [keyFilters, SetFilters, ResetFilters] = usePredicates<string, Predicate<T>>(); 

  const filters = (t: T, i: number, a: T[], positive: T[], negative: T[]) => { 
    return keyFilters.map( f => f[1] ).every( f => f(t, i, a, positive, negative) ); 
  } 
  const [matchValues, unmatchValues] = Filter(values, filters); 
  return {matchValues, unmatchValues, SetFilters, ResetFilters} 
}


/*
export function useFilter<T>(values:T[]) { 
  const [Getfilters, SetFilters] = useStateAt({} as Filters); 
  const filtersobject = Getfilters(); 
  
  const predicate = (x:any) => Object.keys(filtersobject as Filters) 
    .map( p => filtersobject[p] ).every( p => p(x) ); 
  const filteredValues = values.filter( x => predicate(x)); 

  return {filteredValues, SetFilters}; 
} 
*/