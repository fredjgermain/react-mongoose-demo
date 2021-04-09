import {useState} from 'react';
import { Groups } from '../../reusable/_arrayutils'; 




type KeyPredicate = {handle:string, predicate:(x:any) => boolean} 


export function useSorter(values:any[]) { 
  const [_predicates, _setPredicates] = useState<KeyPredicate[]>([]); 
  const [groupedValues] = Groups(values, _predicates.map(p => p.predicate)); 

  const setPredicates = (keyPredicate?:KeyPredicate) => { 
    if(!keyPredicate) 
      _setPredicates([]); 
    else 
      _setPredicates( (prev:KeyPredicate[]) => { 
        const copy = [...prev.filter( kp => kp.handle !== keyPredicate.handle ), keyPredicate]; 
        return copy; 
      }); 
  } 

  return {groupedValues, setPredicates}; 
}

/*
3 possible positions per sorter 
unsorted    [/] 
ascending   [arrow up] 
descending  [arrow dn] 

Use Grouping methods to sort by 1 or multiple creteria

*/

export function InputSort() { 
  const Group

  return <div>

  </div>
} 