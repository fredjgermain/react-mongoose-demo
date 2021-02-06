import React from 'react'; 
//import CSS from ''
import {IEvent, IsNull, OnEnter, SetSize, 
  GetDefaultValueFromIField, GetValueFromInput} from '../../../reusable/_utils'; 



// IInput =================================================
export interface IInput { 
  value:any; 
  setValue:React.Dispatch<React.SetStateAction<any>>; 
  ifield:IField; 

  inputType?:string; 
  width?: (value:any) => number; 
  validator?: (value:any) => boolean; 
  placeholder?: any; 
  onPressEnter?: () => void; 
} 

// --------------------------------------------------------
export function Input({value, setValue, ifield, 
  inputType, 
  width = (value:any) => SetSize(value), 
  validator=(value:any) => true, 
  onPressEnter=() => {}, 
  placeholder}:IInput) { 

  // get correct default value
  const defaultValue = GetDefaultValueFromIField(ifield); 

  // value never null
  const Value = IsNull(value) ? defaultValue: value; 
  
  // onChange 
  const onChange = (event:IEvent) => { 
    const valueFromInput = GetValueFromInput(event); 
    const newValue = IsNull(valueFromInput) ? defaultValue: valueFromInput; 
    if(validator(newValue)) 
      setValue((prev:any) => newValue); 
  } 

  // on PressEnter
  const onKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => OnEnter(event, onPressEnter); 
  const style = {width: `${width(Value)+2}ch`}; 

  if(ifield.type === 'boolean') 
    return <input {...{type:inputType, checked:Value, onChange, onKeyUp}} /> 
  return <input {...{type:inputType, value:Value, onChange, onKeyUp}} style={style} /> 
}