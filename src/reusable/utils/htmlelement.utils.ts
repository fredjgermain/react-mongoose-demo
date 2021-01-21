import React from 'react'; 
import {IsNull} from '../_utils'; 

// IEvent #####################################
export interface IEvent extends React.ChangeEvent<HTMLInputElement> { 
  code?:any, 
  [key:string]:any, 
} 

export function OnEnter(event:any, Func:any) { 
  if(IsPressEnter( (event as IEvent).code ) ) 
    Func(); 
} 



// Get Value From Input -------------------------
export function GetValueFromInput(event:IEvent) { 
  const target = event.target; 
  const type = target.type; 
  if(type === 'number') 
    return target.valueAsNumber as number; 
  if(type === 'date') 
    return target.valueAsDate; 
  if(type === 'checkbox') 
    return target.checked as boolean; 
  return target.value; 
} 


// GetInputType ---------------------------------
export function GetInputType(type:string) { 
  if(type === 'number') 
    return 'number'; 
  if(type === 'boolean') 
    return 'checkbox'; 
  if(type === 'string') 
    return 'text'; 
  return 'text'; 
}


// If Code is pressEnter
export function IsPressEnter(code:string = ''):boolean { 
  return code === 'Enter' || code === 'NumpadEnter'; 
} 


// TAG UTILS ###################################
export function SetWidth(value:number):{width:any} {
  return {width:`${SetSize(value)+2}ch`}; 
}

export function SetSize(value:any):number { 
  const w = String(value).length; 
  return w < 2 ? 2 : w; 
} 

