import React from 'react'; 

// IEvent #####################################
export interface IEvent extends React.ChangeEvent<HTMLInputElement> { 
  code?:any, 
  [key:string]:any, 
} 

export function OnPress(event:any, keys:string[], Func:()=>void)  { 
  const {code} = (event as IEvent); 
  if(keys.includes(code)) 
    Func(); 
} 

export function OnEnter(event:any, Func:()=>void = ()=>{}) { 
  OnPress(event, ['Enter', 'NumpadEnter'], Func); 
} 

export function OnTab(event:any, Func:()=>void) { 
  OnPress(event, ['Tab'], Func); 
} 



// Get Value From Input -------------------------
export function GetValueFromInput(event:IEvent) { 
  const target = event.target; 
  const type = target.type; 
  if(type === 'number') 
    return target.valueAsNumber as number; 
  if(type === 'date') { 
    //console.log([target.value, target.valueAsDate]); 
    //return target.valueAsDate; 
    return target.value; 
  }
  if(type === 'checkbox') 
    return target.checked as boolean; 
  return target.value; 
} 


/* GetInputType ---------------------------------
List of acceptable types;
button, checkbox, color, date, datetime-local, email, image, hidden, number, password, range, reset, tel, text, time, url, week

List of excluded types; file, 
*/
export function GetInputType(type:string) { 
  const acceptableTypes = ['button', 'checkbox', 'color', 'date', 'datetime-local', 'email', 'image', 'hidden', 'number', 'password', 'range', 'reset', 'tel', 'text', 'time', 'url', 'week']; 
  
  if(type === 'string') 
    return 'text'; 
  if(type === 'boolean') 
    return 'checkbox'; 
  if(acceptableTypes.includes(type)) 
    return type; 
  return 'text'; 
}


// TAG UTILS ###################################
export function SetWidth(value:number):{width:any} { 
  return {width:`${SetSize(value)+2}ch`}; 
} 

export function SetSize(value:any):number { 
  const w = String(value).length; 
  return w < 4 ? 4 : w; 
} 

