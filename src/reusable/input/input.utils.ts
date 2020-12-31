// IOptions -------------------------------------
export interface IOption{ 
  value:any; 
  label:string; 
} 

// IEvent interface -----------------------------
export interface IEvent { 
  target:{ 
    type:string, 
    value:string, 
    valueAsDate: Date | null, 
    valueAsNumber: number, 
    checked: boolean | null, 
  } 
  code?:any, 
} 

// IInput interface ------------------------------
export interface IInput { 
  value:any; 
  type: string; 
  placeHolder?: any; 
  useref?: any; 

  returnValue:(value:any) => any; 

  // Event
  onChange?: (event:any) => void; 
  onBlur?: (event:any) => void; 
  onFocus?: (event:any) => void; 
  onPressEnter?: (event:any) => void; 

  // Validation
  validation?: (value:any) => boolean; 
  onValid?: () => void; 
  [key:string]:any; 
} 

/* Get Value From Input
  - Get correct value type (string, number, date, or boolean) from input element. */
export function GetValueFromInput(event:IEvent, type:string):any { 
  if(type === 'number') 
    return event.target.valueAsNumber as number; 
  if(type === 'date') 
    return event.target.valueAsDate; 
  if(type === 'boolean') 
    return event.target.checked as boolean; 
  return event.target.value; 
}

/* SetSize
  - Set adjustable size of input element. 
*/
export function SetSize(value:any):number { 
  const w = String(value).length; 
  return w < 5 ? 5 : w; 
} 

// If Code is pressEnter
export function IsPressEnter(code:string = ''):boolean { 
  return code === 'Enter' || code === 'NumpadEnter'; 
} 


