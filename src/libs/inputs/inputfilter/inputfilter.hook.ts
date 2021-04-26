import { useStateAt } from '../../_customhooks'; 

interface Filters { 
  [key:string]: (x:any, i:number, a:any[]) => boolean; 
} 

export function useFilter(values:any[]) { 
  const [Getfilters, SetFilters] = useStateAt({} as Filters); 
  const filtersobject = Getfilters(); 

  const predicate = (x:any) => Object.keys(filtersobject as Filters)
    .map( p => filtersobject[p] ).every( p => p(x) ); 
  
  const filteredValues = values.filter( x => predicate(x)); 
  return {filteredValues, SetFilters}; 
} 