import { Sorts, Sorter } from '../../_arrayutils'; 
import { usePredicates } from '../inputfilter/inputfilter.hook'; 


export function useSorter<T>(values:T[]) { 
  const [keySorters, SetSorters, ResetSorters] = usePredicates<string, Sorter<T>>(); 
  const sorters = keySorters.map( s => s[1] ); 
  const sortedValues = Sorts(values, sorters); 
  return {sortedValues, keySorters, SetSorters, ResetSorters} 
}


/*
export function useSorter(values:any[] = []) { 
  const [GetSorters, SetSorters] = useStateAt({} as Sorters); 
  const sortersObject = GetSorters() as Sorters; 
  const sorters = Object.keys(sortersObject).map( p => sortersObject[p] ); 
  
  const sortedValues = Sorts(values, sorters); 
  return {sortedValues, SetSorters}; 
} */