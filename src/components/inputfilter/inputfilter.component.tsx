import React, { useContext, useEffect, useState } from 'react'; 
//import { Filter, Predicate } from '../../reusable/_arrayutils'; 
import { IsEmpty, GetDefaultValueByType } from '../../reusable/_utils'; 
import { Input } from '../editor_reader/input/_input'; 


type _Predicate = (x:any) => boolean; 


type KeyPredicate = {handle:string, predicate:(x:any) => boolean} 


export const FilterPredicatesContext = React.createContext({} as IUseFilters); 


export function InputFilters({values, children}:React.PropsWithChildren<{values:any[]}>) { 
  const context = useFilters(values); 
  return <FilterPredicatesContext.Provider value={context}> 
    {JSON.stringify(context.filteredValues)}
    {children} 
  </FilterPredicatesContext.Provider> 
} 

export function InputFilter({handle, type}:{handle:string, type:string}) { 
  const {setPredicates} = useContext(FilterPredicatesContext); 
  const [value, setValue] = useState(''); 
  const onSetValue = (newValue:any) => setValue(newValue); 

  const onPressEnter = () => { 
    const predicate = FilterPredicate(value, type, handle); 
    setPredicates({handle, predicate}); 
  }; 

  return <Input {...{type:'string', value, onSetValue, onPressEnter}} /> 
} 



interface IUseFilters { 
  filteredValues: any[]; 
  setPredicates: (keyPredicate?: KeyPredicate) => void; 
} 
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
  const predicate = FilterPredicate(strPredicate, type, handle); 

  useEffect(()=>{ 
    setPredicates({handle, predicate}); 
  }, [strPredicate]); 
  
  return [strPredicate, setStrPredicate]; 
} 



function FilterPredicate(strPredicate:string, type:string, key?:string): (x:any) => boolean { 
  let predicate = (x:any) => true; 
  if(IsEmpty(strPredicate)) 
    return predicate; 
  
  if(type === 'boolean') 
    predicate = EqualPredicate(strPredicate); 
  else if(type === 'string') 
    predicate = StringMatchPredicate(strPredicate); 
  else 
    predicate = LambdaPredicate(strPredicate); 

  return key ? 
    (x:any) => { return predicate(x[key])} : 
    predicate; 
} 

function EqualPredicate(strPredicate:string):(x:any) => boolean { 
  return (x:string) => { 
    return String(x) === strPredicate; 
  } 
} 

function StringMatchPredicate(strPredicate:string):(x:any) => boolean { 
  return (x:string) => { 
    return !!x.match(strPredicate); 
  } 
}

function LambdaPredicate(strPredicate:string): (x:any) => boolean { 
  /*const operator =  /[(>=)|(<=)|(>)|(<)|(=)]/ 
  const operand =  /[(>=)|(<=)|(>)|(<)|(=)]/ */ 
  const seperator = /[(&&)]/ 
  const strPredicates = strPredicate.split(seperator).filter(s => s!==''); 
  const predicates:((x:any) => boolean)[] = []; 
  strPredicates.forEach( p => { 
    try{ 
      const func = (x:any):boolean => eval(x.toString() + p); 
      func(0); 
      predicates.push(func); 
    }catch(error) { 
      return (x:any) => true; 
    }; 
  }) 
  return (x:any) => predicates.every( predicate => predicate(x) ); 
}