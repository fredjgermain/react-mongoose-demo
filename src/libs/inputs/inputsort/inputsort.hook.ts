import { useStateAt } from '../../_customhooks'; 
import { Sorts, Sorter } from '../../_arrayutils'; 
import { IInputSorter } from './inputsort.type'; 

interface Sorters { 
  [key:string]: Sorter<any>; 
} 

interface I<T> { 
  i:number; 
  t:T; 
}

export function useSorter(values:any[] = []) { 
  const [GetSorters, _SetSorters] = useStateAt({} as Sorters); 
  const sortersObject = GetSorters() as Sorters; 
  const sorters = Object.keys(sortersObject).map( p => sortersObject[p] ); 
  
  const indexdValues = values.map( (t,i) => { 
    return {i, t} as I<any>; 
  }); 

  const SetSorters = (newSorter:Sorter<any>, handle:string) => { 
    const sorter = (value:I<any>, pivot:I<any>) => { 
      return newSorter(value.t, pivot.t); 
    }; 
    _SetSorters(sorter, [handle]); 
  }
  
  const sortedValues = Sorts(indexdValues, sorters); 
  return {sortedValues, SetSorters}; 
} 