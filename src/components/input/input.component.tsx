import React, {useContext, useEffect, useState} from 'react'; 
import {GetValueFromInput, IEvent, IOption, IsPressEnter} from '../../reusable/_input'; 
import {ToArray, Remove, Union, Filter} from '../../reusable/_utils'; 

import './select.styles.css'; 


interface IInput extends React.HTMLAttributes<HTMLInputElement> { 
  type?:string; 
  value:any; 
  setValue:any; 
  [key:string]:any; 
} 
export function Input({value, type=(typeof value), setValue, ...props}:IInput) { 
  const OnChange = (event:IEvent) => setValue(() => GetValueFromInput(event, type)); 

  if(type === 'string') 
    return <input type={'text'} value={value} onChange={OnChange} {...props}  /> 
  if(type === 'number') 
    return <input type={'number'} value={value} onChange={OnChange} {...props} /> 
  if(type === 'boolean') 
    return <input type={'checkbox'} checked={value} onChange={OnChange} {...props} /> 
  return <span>{JSON.stringify(value)}</span>
}


// SELECT CONTEXT =======================================
interface ISelectContext { 
  value: any; 
  placeholder: string; 
  fold: boolean; 
  Fold: any; 
  Select: any; 
  options:IOption[]; 
  setOptions: any; 
  GetSelection: () => IOption[]; 
} 
const SelectContext = React.createContext({} as ISelectContext); 


// SELECT =======================================
interface ISelect { 
  type: string; 
  value: any; 
  setValue: any; 
  placeholder?: string; 
  multiple?:boolean; 
} 
export function Select({type, value, setValue, placeholder = 'select', multiple, children}:React.PropsWithChildren<ISelect>) { 
  const [fold, setFold] = useState(true); 
  const Fold = () => {setFold(() => !fold)}; // replace by a useCallback ??
  const [options, setOptions] = useState<IOption[]>([]); 

  // Select --------------------------
  function Select(newValue:any) { 
    const selection = ToArray(value); 
    const newSelection = selection.includes(newValue) ? 
      Remove(selection, (e) => e === newValue)[0] : 
      multiple ? 
        Union(selection, newValue) : 
        ToArray(newValue); 
    const newValues = multiple ? newSelection: newSelection.shift(); 
    setValue(() => newValues); 
    if(!multiple) 
      setFold(true); 
  } 
  // GetSelection -------------------------------------
  function GetSelection():IOption[] { 
    const values = [value].flat(); 
    const selectedOptions:IOption[] = []; 
    values.forEach( v => { 
      const option = options.find(o => o.value === v); 
      if(option) 
        selectedOptions.push(option); 
    }); 
    
    return selectedOptions; 
  } 
  // --------------------------------------------


  const context = {value, placeholder, fold, Fold, Select, options, setOptions, GetSelection}; 
  return <SelectContext.Provider value={context} > 
    <div className={'select_main'}> 
      <SelectHeader /> 
      <div className={'select_body'}>
        {children}
      </div>
    </div> 
  </SelectContext.Provider> 
} 



// SELECT HEADER ================================
export function SelectHeader() { 
  const {placeholder, Fold, GetSelection} = useContext(SelectContext); 

  /*
  
  */

  const selection = GetSelection(); 
  return <div className={'select_header'}> 
    <div className={'select_header_removable_items'}> 
      {selection.length > 0 ? 
        <RemovableItems />: 
        placeholder} 
    </div> 
    <div className={'select_header_foldbtn'}> 
      <button onClick={Fold}>V</button> 
    </div> 
  </div> 
} 


// REMOVABLE ITEM LIST ===============================
export function RemovableItems() { 
  const {value, options, Select, GetSelection} = useContext(SelectContext); 

  const selection = GetSelection(); 
  return <span> 
    {selection.map( (o,i) => { 
      return <button key={i} 
        onClick={() => Select(o.value)}> 
          {o.label} | X 
        </button> 
    })} 
  </span> 
}



// OPTIONS ======================================
interface IOptions { 
  label?:string; // defines a optgroup with a label 
  options:IOption[]; 
  [key:string]:any; 
} 
//const OptionsContext = React.createContext({}); 
export function Options({label, options:os, ...props}:IOptions) { 
  const {options, fold, setOptions, Select} = useContext(SelectContext); 
  
  useEffect(() => { 
    setOptions( (prev:any) => [...prev, ...os] ); 
  }, []); 

  return <div> 
    {!fold ? os.map( (o,i) => { 
      return <Option key={i} option={o} /> 
    }): 
    null} 
  </div> 
} 


function Option({option}:{option:IOption}) { 
  const {options, fold, setOptions, Select} = useContext(SelectContext); 
  return <div className={'select_body_option'} onClick={() => Select(option.value)}> 
    {option.label} 
  </div>
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