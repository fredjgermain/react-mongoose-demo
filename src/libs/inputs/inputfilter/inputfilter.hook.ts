import { useState, useContext, useEffect } from 'react'; 
import { IUseFilters, KeyPredicate } from './inputfilter.type';
import { FilterPredicatesContext } from './inputfilter.component'; 
import { FilterPredicate } from './inputfilter.utils'; 


export function useFilters(values:any[]):IUseFilters { 
  const [_predicates, _setPredicates] = useState<KeyPredicate[]>([]); 
  const predicate = (x:any) => _predicates.map(p => p.predicate).every( p => p(x) ); 
  const filteredValues = values.filter( x => predicate(x) ); 

  const setPredicates = (keyPredicate?:KeyPredicate) => { 
    if(!keyPredicate) 
      _setPredicates([]); 
    else 
      _setPredicates( (prev:KeyPredicate[]) => { 
        const copy = [...prev.filter( kp => kp.handle !== keyPredicate.handle ), keyPredicate]; 
        return copy; 
      }); 
  } 

  return {filteredValues, setPredicates}; 
} 

export function useFilter(handle:string, type:string) { 
  const {filteredValues, setPredicates} = useContext(FilterPredicatesContext); 
  const [strPredicate, setStrPredicate] = useState(''); 
  const keyPredicate = {handle, 
    predicate:FilterPredicate(strPredicate, type, handle)
  }; 

  useEffect(()=>{ 
    setPredicates(keyPredicate); 
  }, [strPredicate]); 
  
  return [strPredicate, setStrPredicate]; 
} 
