import { useStateAt } from '../../_customhooks'; 
import { IndexArray, Indexed } from '../../_arrayutils'; 

interface Filters { 
  [key:string]: (x:any, i:number, a:any[]) => boolean; 
} 

export function useFilter(values:any[]) { 
  const indexdValues = IndexArray(values); 
  const [Getfilters, SetFilters] = useStateAt({} as Filters); 
  const filtersobject = Getfilters(); 
  
  const predicate = (x:Indexed<any>) => Object.keys(filtersobject as Filters) 
    .map( p => filtersobject[p] ).every( p => p(x.t) ); 
  
  const filteredValues = indexdValues.filter( x => predicate(x)); 
  return {filteredValues, SetFilters}; 
} 