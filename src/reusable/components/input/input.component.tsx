import React from 'react'; 
import {IEvent, IsNull, OnEnter, 
  GetDefaultValueByType, GetTypeByValue, GetInputType, GetValueFromInput} from '../../_utils'; 


// INPUT ========================================
export interface IInput extends React.HTMLAttributes<HTMLInputElement> { 
  value:any; 
  setValue:any; 
  type?:string; 
  defaultValue?:any; 
  inputType?:string; 
  onEnterUp?:() => void; 
} 
export function Input(
  {
    value, setValue, 
    type=GetTypeByValue(value??''), 
    defaultValue=GetDefaultValueByType(type??'string'), 
    inputType=GetInputType(type??''), 
    onEnterUp=() => {}, 
    ...props
  }:IInput) 
{ 
  const onChange = (event:IEvent) => setValue(GetInputValueOrDefault(event, defaultValue)); 
  const Value = IsNull(value) ? defaultValue: value; 
  const onKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => OnEnter(event, onEnterUp); 

  if(type === 'boolean') 
    return <input {...{type:inputType, checked:Value, onChange, onKeyUp,  ...props}} /> 
  return <input {...{type:inputType, value:Value, onChange, onKeyUp, ...props}} /> 
} 


// GetValue --------------------------------------
function GetInputValueOrDefault (event:IEvent, defaultValue:any) { 
  const value = GetValueFromInput(event); 
  return IsNull(value) ? defaultValue: value; 
}


/* Get Value From Input
  - Get correct value type (string, number, date, or boolean) from input element. */
/*function GetValueFromInput(event:IEvent, type:string):any { 
  if(type === 'number') 
    return event.target.valueAsNumber as number; 
  if(type === 'date') 
    return event.target.valueAsDate; 
  if(type === 'boolean') 
    return event.target.checked as boolean; 
  return event.target.value; 
}*/

