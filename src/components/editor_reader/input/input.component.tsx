import React from 'react';
import {IEvent, IsNull, OnEnter, DefaultWidth, 
  GetValueFromInput, GetInputType, GetDefaultValueByType} from '../../../reusable/_utils'; 


export interface IInput{ 
  type: string; 
  value: any; 
  defaultValue?: any; 

  placeholder?: string; 

  onSetValue: (newValue:any) => void; 
  onPressEnter?: () => void; 

  sizeFunc?: (value:any) => number; 
  inputAttribute?: React.InputHTMLAttributes<HTMLInputElement>; 
}

export function Input({...props}:IInput) { 
  const {width, ...args} = PrepArgs(props); 
  // Concatenate width defined above with inputAttribute.style if any other style has been defined. 
  const style = {...props.inputAttribute?.style, ...width} 

  // Regroup arguments
  const inputArgs = {...props.inputAttribute, ...args, style}; 

  if(args.type==='checkbox') 
    return <input {...inputArgs} {...{checked:args.value} } /> 
  return <input {...inputArgs} /> 
} 


function PrepArgs({...props}:IInput) { 
  const type = GetInputType(props.type); 
  const defaultValue = IsNull(props.defaultValue) ? 
    GetDefaultValueByType(props.type) : 
    props.defaultValue; 
  const value = IsNull(props.value) ? 
    defaultValue : 
    props.value; 
  
  const placeholder = props.placeholder ?? ''; 

  // Called on input Change
  const onChange = (event:IEvent) => { 
    const valueFromInput = GetValueFromInput(event); 
    const newValue = IsNull(valueFromInput) ? defaultValue : valueFromInput; 
    if(JSON.stringify(newValue) !== JSON.stringify(value) ) 
      props.onSetValue(newValue); 
  } 

  // Function called on KeyUp. 
  const onKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => OnEnter(event, props.onPressEnter); 

  // Calculate input width 
  const width = props.sizeFunc ? 
    {width: `${props.sizeFunc(value)}ch`}: 
    {width: `${DefaultWidth(value, type)}ch`}; 
  
  // Regroups to arguments to pass to input tag
  return {type, value, placeholder, onChange, onKeyUp, width} 
}