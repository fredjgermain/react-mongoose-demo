import { useStateAt } from '../../_customhooks'; 
import { Sorts, Sorter, Indexed, IndexArray } from '../../_arrayutils'; 

interface Sorters { 
  [key:string]: Sorter<any>; 
} 


export function useSorter(values:any[] = []) { 
  const indexdValues = IndexArray(values); 
  const [GetSorters, _SetSorters] = useStateAt({} as Sorters); 
  const sortersObject = GetSorters() as Sorters; 
  const sorters = Object.keys(sortersObject).map( p => sortersObject[p] ); 
  

  const SetSorters = (newSorter:Sorter<any>, handle:string) => { 
    const sorter = (value:Indexed<any>, pivot:Indexed<any>) => { 
      return newSorter(value.t, pivot.t); 
    }; 
    _SetSorters(sorter, [handle]); 
  }
  
  const sortedValues = Sorts(indexdValues, sorters); 
  return {sortedValues, SetSorters}; 
} 