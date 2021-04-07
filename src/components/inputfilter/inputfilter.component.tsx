import React, { useContext, useEffect, useState } from 'react'; 
import { Filter, Filters, Predicate } from '../../reusable/_arrayutils'; 
import { IsEmpty, GetDefaultValueByType } from '../../reusable/_utils'; 
import { Input } from '../editor_reader/input/_input'; 
import { InputSelect } from '../editor_reader/inputselect/_inputselect'; 
//import {Editor, IEditor} from '../../components/editor_reader/editor/_editor'; 



/* 
Sorter (ascending or descending) 

InputFiltor 
  number => range ?, write predicate ? 
  string => include substring 
  bool => checkbox 
  date => range? 
*/ 

type _Predicate = (x:any) => boolean; 

/*
<FilterContext> 
  foreach key 
    <InputFilter ... modifies FilterContext 
<FilterContext> 

<table ... > 


*/


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
  const onSetValue = (newValue:string) => setValue(newValue); 

  const onPressEnter = () => { 
    const predicate = FilterPredicate(value, type, handle); 
    setPredicates({handle, predicate}); 
  }; 

  return <Input {...{type:'string', value, onSetValue, onPressEnter}} /> 
}

export function FilterBy() { 

}




interface IUseFilters { 
  filteredValues: any[]; 
  setPredicates: (keyPredicate?: KeyPredicate) => void; 
} 
export function useFilters(values:any[]):IUseFilters { 
  const [_predicates, _setPredicates] = useState<KeyPredicate[]>([]); 
  const [filteredValues] = Filters(values, _predicates.map(p => p.predicate)); 

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
  if(type === 'string') 
    predicate = StringMatchPredicate(strPredicate); 
  predicate = LambdaPredicate(strPredicate); 

  return key ? 
    (x:any) => { return predicate(x.key); } : 
    predicate; 
} 

function EqualPredicate(strPredicate:string):(x:any) => boolean { 
  return (x:string) => { 
    return x === strPredicate; 
  } 
} 

function StringMatchPredicate(strPredicate:string):(x:any) => boolean { 
  return (x:string) => { 
    return !!strPredicate.match(x); 
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









/*
export function FilterBy({...props}:{k?:string, type:string, setPredicates:any} ) { 
  const [strPredicate, setStrPredicate] = useState(''); 
  const _predicate = FilterPredicate(strPredicate, props.type); 
  const [predicate, setPredicate] = useState(  {_predicate} ); 

  useEffect(() => { 
    props.setPredicates( (prev:any[]) => { 
      console.log(prev.findIndex( p => p === predicate )); 
      return [...prev.filter( p => p === predicate ), predicate]; 
    }); 
  },[]); 

  const _onChange = (newStrPredicate:string) => { 
    const newPredicateFunc = FilterPredicate(newStrPredicate, props.type); 
    setStrPredicate(newStrPredicate); 
    setPredicate({_predicate:newPredicateFunc}); 

    props.setPredicates( (prev:any[]) => { 
      console.log(prev.findIndex( p => p === predicate )); 
      return [...prev.filter( p => p === predicate ), newPredicateFunc]; 
    }); 
  } 
  
  const args = { 
    _value: strPredicate, 
    _defaultValue: GetDefaultValueByType(props.type), 
    _type:'string', 
    _onChange, 
  }; 

  return <div> 
    {strPredicate} <br/> 
    <Input {...args}/> 
  </div> 
} 





export function InputFilter({...props}:{type:string, onChangePredicate:(newPredicate:_Predicate)=>void}) { 
  const [strPredicate, setStrPredicate] = useState(''); 

  const _onChange = (newPredicate:string) => { 
    setStrPredicate(newPredicate); 
    const predicateFunc = FilterPredicate(newPredicate, props.type); 
    props.onChangePredicate(predicateFunc); 
  } 
  
  const args = { 
    _value: strPredicate, 
    _defaultValue: GetDefaultValueByType(props.type), 
    _type:'string', 
    _onChange, 
  }; 

  return <div> 
    {strPredicate} <br/> 
    <Input {...args}/> 
  </div> 
} 


export function Search({selection, setSelection, field}:{selection:any[], setSelection:(newValues:any[]) => void, field?:string}) { 
  const [_value, setValue] = useState([] as any[]); 
  const _onChange = (newValue:any[]) => setValue(newValue); 

  const predicate:Predicate<any> = (t:any, positive:any[]) => !positive.includes(t); 
  const [options] = Filter(selection.map( s => s[field]), predicate); 
  console.log(options); 
  
  const _options = options.map( s => { 
    return {value:s, label:JSON.stringify(s)} 
  }) as {value:any, label:string}[]; 

  useEffect(() => { 
    const predicate = IsEmpty(_value) ? () => true: (t:any) => _value.includes(t[field]); 
    const filteredSelection = selection.filter(predicate); 
    setSelection(filteredSelection); 
  },[_value]); 

  return <div> 
    <InputSelect {...{_value, _onChange, _options, _multiple:true}} /> 
  </div> 
} 



export interface IInput { 
  type: string; 
  value: any; 
  defaultValue: any; 
  onChange: (newValue:any) => void; 
  onEnter?: () => void; 

  onBlur?: () => void; 
  onFocus?: () => void; 

  size?: (value:any) => number; 
} 
*/