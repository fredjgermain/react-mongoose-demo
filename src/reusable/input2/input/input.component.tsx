import React, { useState } from 'react'; 
import {IEvent, IsNull, OnEnter, 
  GetDefaultValueByType, GetTypeByValue, GetInputType, GetValueFromInput} from '../../utils/_utils'; 



export interface IInput extends React.HTMLAttributes<HTMLInputElement> { 
  value:any; 
  type?:string; 
  defaultValue?:any; 
  inputType?:string; 
  onEnterUp?:() => void; 
  getValue:(value:any) => any; 
} 

// INPUT ========================================
export function Input(
  {
    value, 
    type=GetTypeByValue(value??''), 
    defaultValue=GetDefaultValueByType(type??'string'), 
    inputType=GetInputType(type??''), 
    onEnterUp=() => {}, 
    ...props
  }:IInput
) 
{ 
  const [_value, _setValue] = useState(value); 
  const onChange = (event:IEvent) => _setValue(GetInputValueOrDefault(event, defaultValue)); 
  const _Value = IsNull(_value) ? defaultValue: _value; 
  const onKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => OnEnter(event, onEnterUp); 

  console.log({value, _value, _Value, type, defaultValue, inputType});

  if(type === 'boolean') 
    return <input {...{type:inputType, checked:_Value, onChange, onKeyUp,  ...props}} /> 
  return <input {...{type:inputType, value:_Value, onChange,  ...props}} /> 
} 


function GetInputValueOrDefault (event:IEvent, defaultValue:any) { 
  const value = GetValueFromInput(event); 
  return IsNull(value) ? defaultValue: value; 
}
