import {ToArray, Remove, Union, IsEmpty} from '../../_utils'; 
//import {useToggle, IUseToggle} from '../../_usetoggle'; 

// USE SELECT ====================================
export interface IUseSelect { 
  value:any; 
  setValue:any; 
  options:IOption[]; 
  GetSelection: () => IOption[]; 
  placeholder:string; 
  multiple:boolean; 
  
  SelectValue:(newValue:any) => void; 
} 
export function useSelect(value:any, setValue:any, options:IOption[], placeholder:string, multiple:boolean):IUseSelect { 
  // SelectValue ................................
  function SelectValue (newValue:any) { 
    const selection = ToArray(value); 
    const newSelection = selection.includes(newValue) ? 
      Remove(selection, (e) => e === newValue)[0] : 
      multiple ? 
        Union(selection, newValue) : 
        ToArray(newValue); 
    const newValues = multiple ? newSelection: newSelection.shift(); 
    setValue(newValues); 
  } 

  function GetSelection() { 
    if(IsEmpty(value)) 
      return []; 
    const values = ToArray(value); 
    return values.map( v => options.find(o => o.value === v) as IOption); 
  }

  return {value, setValue, options, GetSelection, placeholder, multiple, SelectValue}; 
} 