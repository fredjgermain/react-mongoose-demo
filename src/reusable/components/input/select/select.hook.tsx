import {useState} from 'react'; 
import {ToArray, Remove, Union} from '../../../utils/_utils'; 

// USE SELECT ====================================
export interface IUseSelect { 
  value:any; 
  setValue:any; 
  multiple:boolean; 

  fold: boolean; 
  Fold:(toFold:boolean) => void; 
  SelectValue:(newValue:any) => void; 
  selectedOptions:() => IOption[]; 
  options:IOption[]; 
  setOptions:any; 

  Focus:(toFocus:boolean) => void; 
} 
export function useSelect(value:any, setValue:any, multiple:boolean, ref:React.RefObject<HTMLDivElement>):IUseSelect { 
  const [fold, setFold] = useState(true); 
  const Fold = (fold:boolean) => setFold((prev:any) => fold); // replace by a useCallback ?? 
  const [options, setOptions] = useState<IOption[]>([]); 

  // SelectValue ................................
  const SelectValue = (newValue:any) => { 
    const selection = ToArray(value); 
    const newSelection = selection.includes(newValue) ? 
      Remove(selection, (e) => e === newValue)[0] : 
      multiple ? 
        Union(selection, newValue) : 
        ToArray(newValue); 
    const newValues = multiple ? newSelection: newSelection.shift(); 
    setValue(newValues); 
    if(!multiple) 
      setFold(true); 
  } 

  // GetSelection ...............................
  const selectedOptions = ():IOption[] => { 
    const values = [value].flat(); 
    const selectedOptions:IOption[] = []; 
    values.forEach( v => { 
      const option = options.find(o => o.value === v); 
      if(option) 
        selectedOptions.push(option); 
    }); 
    return selectedOptions; 
  } 

  /* 
  With Button Unfold:
    onClick call Fold, then call Focus
  With Button Fold:
    onMouseDown call Focus
    onClick call Fold
  */
  const Focus = (toFocus:boolean) => { 
    if(!ref.current) 
      return; 
    if(toFocus) { 
      ref.current.hidden = false; 
      ref.current.focus(); 
      ref.current.onblur= () => Fold(true); 
    } 
    else { 
      ref.current.onblur=() => {}; 
    } 
  }

  return {value, setValue, multiple, fold, Fold, SelectValue, selectedOptions, options, setOptions, Focus}; 
} 