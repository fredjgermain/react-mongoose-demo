import { useStateAt } from '../../_customhooks'; 
import { Sorts, Sorter } from '../../_arrayutils'; 

interface Sorters { 
  [key:string]: Sorter<any>; 
} 

export function useSorter(values:any[]) { 
  const [GetSorters, SetSorters] = useStateAt({} as Sorters); 
  const sortersObject = GetSorters() as Sorters; 
  const sorters = Object.keys(sortersObject).map( p => sortersObject[p] ); 
  const sortedValues = Sorts(values, sorters); 
  return {sortedValues, SetSorters}; 
} 