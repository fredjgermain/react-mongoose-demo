import React from 'react'; 
import {IEvent} from '../../reusable/_input'; 
import {IsNull} from '../../reusable/_utils'; 


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
  const OnChange = (event:IEvent) => setValue(GetValue(event, type, defaultValue)); 
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
function GetValue (event:IEvent, type:string, defaultValue:any) {
  const value = GetValueFromInput(event, type); 
  return IsNull(value) ? defaultValue: value; 
}


/* Get Value From Input
  - Get correct value type (string, number, date, or boolean) from input element. */
function GetValueFromInput(event:IEvent, type:string):any { 
  if(type === 'number') 
    return event.target.valueAsNumber as number; 
  if(type === 'date') 
    return event.target.valueAsDate; 
  if(type === 'boolean') 
    return event.target.checked as boolean; 
  return event.target.value; 
}

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


/*
<option key={i} value={o.value} >{o.label}</option>)} 
interface ISelect extends React.SelectHTMLAttributes<HTMLSelectElement> {
  type:string; 
  value?:any; 
  setValue:any; 
  muliple?:boolean; 
  //options:IOption[]; 
  [key:string]:any; 
} 

export function Selector({value, type, setValue, multiple=false, children, ...props}:React.PropsWithChildren<ISelect>) { 
  // header 
  // select 
  // options 

  // selectedOptions 
  // value  ... needs to be converted ?? 

  const ref = useRef<HTMLSelectElement>(null);

  const GetSelectedOptions = (event:IEvent) => { 
    return Object.keys(event.target.selectedOptions).map( (s:any) => event.target.selectedOptions[s] ) 
  } 

  function Fold() { 
    //ref.current?.blur(); 
    if(ref.current)
      
      //ref.current.ontoggle = () => console.log("toggle");
    console.log(ref.current.); 
    console.log(ref.current?.disabled); 
    /*console.log(ref.current?.hidden);
    if(ref.current)
      ref.current.hidden = true;
    console.log(ref.current?.hidden);
    
    //console.log(); 
  }


  const GetSelectedValues = (event:IEvent) => { 
    const selectedOptions = GetSelectedOptions(event); 
    return selectedOptions.map(o=> DeString(o.value, type)); 
  } 

  const OnChange = (event:any) => { 
    const selectedValues = GetSelectedValues(event); 
    const values= multiple ? selectedValues : selectedValues[0]; 
    setValue(() => values); 
    Fold(); 
  } 

  return <select onChange={OnChange}  {...{ref, multiple,...props}} > 
    {children} 
  </select> 
}


interface IOptions { 
  label?:string; // defines a optgroup with a label 
  options:IOption[]; 
  [key:string]:any; 
} 
const OptionsContext = React.createContext({}); 
export function Options({label, options, ...props}:IOptions) { 

  return <OptionsContext.Provider value={{}}> 
    {options.map( (o,i) => <option key={i} value={o.value} >{o.label}</option>)} 
  </OptionsContext.Provider>
}

function DeString(value:string, type:string) { 
  if(type==='number') 
    return Number(value); 
  if(type==='boolean') 
    return value === 'true'; 
  return value; 
} */