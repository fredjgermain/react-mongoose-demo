import React from 'react'; 
import {IEvent, IsNull, GetValueFromInput} from '../../utils/_utils'; 


// INPUT ========================================
export interface IInput extends React.HTMLAttributes<HTMLInputElement> { 
  value:any; 
  setValue:any; 
  defaultValue:any; 
  type?:string; 
  inputType?:string; 
  //[key:string]:any; 
} 
export function Input({value, setValue, defaultValue, type=(typeof value), inputType, ...props}:IInput) { 
  const OnChange = (event:IEvent) => setValue(GetInputValueOrDefault(event, defaultValue)); 
  //const InputType = GetInputType(type, inputType); 
  const Value = IsNull(value) ? defaultValue: value; 

  if(type === 'string') 
    return <input type={'text'} value={Value} onChange={OnChange} {...props} /> 
  if(type === 'number') 
    return <input type={'number'} value={Value} onChange={OnChange} {...props} /> 
  if(type === 'boolean') 
    return <input type={'checkbox'} checked={Value} onChange={OnChange} {...props} /> 
  return <span>{JSON.stringify(value)}</span> 
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

// GetInputType ---------------------------------
function GetInputType(type:string, inputType?:string) { 
  if(!inputType) 
    return inputType; 
  
  if(type === 'number') 
    return 'number'; 
  if(type === 'boolean') 
    return 'checkbox'; 
  if(type === 'string') 
    return 'text'; 
  return 'text'; 
}

