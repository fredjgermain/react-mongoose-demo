import { useState } from 'react'; 
import { Sorts } from '../../_arrayutils'; 
import { KeySorter } from './inportsort.type'; 


export function useSorters(values:any[]) { 
  const [_sorter, _setSorters] = useState<KeySorter[]>([]); 
  const [groupedValues] = Sorts(values, _sorter.map(p => p.sorter)); 

  const setSorters = (keySorter?:KeySorter) => { 
    if(!keySorter) 
      _setSorters([]); 
    else 
      _setSorters( (prev:KeySorter[]) => { 
        const copy = [...prev.filter( kp => kp.handle !== keySorter.handle ), keySorter]; 
        return copy; 
      }); 
  } 

  return {groupedValues, setSorters}; 
}

export function useSorter(handle:string, type:string) { 
  
}