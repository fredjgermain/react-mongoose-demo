import React, { useEffect, useState } from 'react'; 
import { Filter, Predicate } from '../../reusable/_arrayutils'; 
import { IsEmpty } from '../../reusable/_utils';
import { InputSelect } from '../editor_reader/inputselect/_inputselect'; 
//import {Editor, IEditor} from '../../components/editor_reader/editor/_editor'; 

/* 
selection 
setSelection 
get keys to search by 

list options for each possible values of key. (list unic values) 
InputSelect for each key to search by. 
  + option no search value. 
Depending on selected values setPredicate. 
*/ 


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


