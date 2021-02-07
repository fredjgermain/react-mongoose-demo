import {ToArray, Filter, Union, IsEmpty} from '../../_utils'; 
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
    const {inclusion, exclusion} = Filter(ToArray(value), e => e === newValue); 
    if(IsEmpty(inclusion)) 
      exclusion.push(newValue); 
    setValue(multiple ? exclusion: exclusion.shift()); 
  } 

  function GetSelection() { 
    const selection = [] as IOption[]; 
    if(IsEmpty(value)) 
      return selection; 
    const values = ToArray(value); 
    values.forEach(v => { 
      const option = options.find(o => o.value === v); 
      if(option) 
        selection.push(option); 
    }); 
    return selection; 
  }

  return {value, setValue, options, GetSelection, placeholder, multiple, SelectValue}; 
} 