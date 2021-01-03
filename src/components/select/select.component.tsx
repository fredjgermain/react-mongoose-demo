import React, {useState} from 'react'; 
import {IOption} from '../../reusable/_input'; 
import {ToArray, Remove, Union, SetWidth} from '../../reusable/_utils'; 
import {SelectHeader} from './selectheader.component'; 

import './select.styles.css'; 



// SELECT CONTEXT =======================================
interface ISelectContext { 
  value: any; 
  placeholder: string; 
  fold: boolean; 
  Fold: any; 
  Select: any; 
  options:IOption[]; 
  setOptions: any; 
  Selection: () => IOption[]; 
} 
export const SelectContext = React.createContext({} as ISelectContext); 


// SELECT =======================================
interface ISelect { 
  //type: string; 
  value: any; 
  setValue: any; 
  width?:number; 
  placeholder?: string; 
  multiple?:boolean; 
} 
export function Select({value, setValue, width, placeholder = 'select', multiple=false, children}:React.PropsWithChildren<ISelect>) { 
  const [fold, setFold] = useState(true); 
  const Fold = () => {setFold(() => !fold)}; // replace by a useCallback ??
  const [options, setOptions] = useState<IOption[]>([]); 

  const Select = (newValue:any) => SelectItem(newValue, value, setValue, multiple, setFold); 
  const Selection = () => GetSelection(value, options); 

  const context = {value, placeholder, fold, Fold, Select, options, setOptions, Selection}; 
  const style = width ? SetWidth(width): undefined; 

  return <SelectContext.Provider value={context} > 
    <div className={'select_main'} {...style} > 
      <SelectHeader /> 
      <div className={'select_body'} > 
        {children} 
      </div> 
    </div> 
  </SelectContext.Provider> 
} 

// SelectItem -----------------------------------
function SelectItem(newValue:any, value:any, setValue:any, multiple:boolean, setFold:any) { 
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
function GetSelection(value:any, options:IOption[]):IOption[] { 
  const values = [value].flat(); 
  const selectedOptions:IOption[] = []; 
  values.forEach( v => { 
    const option = options.find(o => o.value === v); 
    if(option) 
      selectedOptions.push(option); 
  }); 
  
  return selectedOptions; 
} 