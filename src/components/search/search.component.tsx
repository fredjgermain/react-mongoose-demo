import React, { useEffect, useState } from 'react'; 
import { Filter, Predicate } from '../../reusable/_arrayutils'; 
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

export function InputFilter({...props}:{type:string, onChange:(newValue:string) => void}) { 
  const [strPredicate, setStrPredicate] = useState(''); 

  const _onChange = (newValue:string) => setStrPredicate(newValue); 
  const args = { 
    _value: strPredicate, 
    _defaultValue: GetDefaultValueByType(props.type), 
    _type:props.type, 
    _onChange, 
  }; 



  /*let predicates:((x:string|number) => boolean)[]; 
  /*if(props.type === 'string') 
    predicates = (s:string) => s.match(strPredicate); 
  //if(props.type === 'number') 
  predicates === ParseNumericPredicate(strPredicate, 0); */
  //values.forEach( v => console.log([v, predicates.every( p => p(v) ) ])) 
  
  return <div> 
    {strPredicate} <br/> 
    <Input {...args}/> 
  </div> 
} 

type FilterPredicate = (x:string|number|boolean) => boolean; 

function BooleanPredicate(value:boolean):FilterPredicate { 
  return (x:string|number|boolean) => { 
    return x === value; 
  } 
}

function StringPredicate(value:string):FilterPredicate { 
  return (x:string|number|boolean) => { 
    return !!value.match((x as string)); 
  } 
}

function NumericPredicate(value:string):FilterPredicate { 
  /*const operator =  /[(>=)|(<=)|(>)|(<)|(=)]/ 
  const operand =  /[(>=)|(<=)|(>)|(<)|(=)]/ */ 
  const seperator = /[(&&)]/ 
  const strPredicates = value.split(seperator).filter(s => s!==''); 
  const predicates:((x:number) => boolean)[] = []; 
  strPredicates.forEach( p => { 
    try{ 
      const func = (x:number):boolean => eval(x.toString() + p); 
      func(0); 
      predicates.push(func); 
    }catch(error) { 
      return (x:number) => true; 
    }; 
  }) 
  return (x:string|number|boolean) => predicates.every( predicate => predicate(x as number) ); 
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


