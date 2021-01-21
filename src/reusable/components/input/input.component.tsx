import React from 'react'; 
//import CSS from ''
import {IEvent, IsNull, OnEnter, SetSize, SetWidth, 
  GetDefaultValueByType, GetTypeByValue, GetInputType, GetValueFromInput} from '../../_utils'; 


// INPUT ========================================
export interface IInput extends React.HTMLAttributes<HTMLInputElement> { 
  value:any; 
  setValue:any; 
  type?:string; 
  defaultValue?:any; 
  inputType?:string; 
  onEnterUp?:() => void; 
  width?: number; 
  [key:string]:any; 
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

  const width = props.width ?? SetSize(value); 
  const style = {width: `${width+2}ch`}; 

  if(type === 'boolean') 
    return <input {...{type:inputType, checked:Value, onChange, onKeyUp,  ...props}} /> 
  return <input {...{type:inputType, value:Value, onChange, onKeyUp, ...props}} style={style} /> 
} 


// GetValue --------------------------------------
function GetInputValueOrDefault (event:IEvent, defaultValue:any) { 
  const value = GetValueFromInput(event); 
  return IsNull(value) ? defaultValue: value; 
}

