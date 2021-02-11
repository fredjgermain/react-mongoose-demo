import {ToArray, Filter} from '../../_arrayutils'; 
import {IsEmpty} from '../../_utils'; 
import {IEditor} from '../../_input'; 

import {useToggle, IUseToggle} from '../../_usetoggle'; 

// USE SELECT ====================================
export interface IUseSelect extends IEditor { 
  options:IOption[]; 
  multiple:boolean; 
  GetSelection: () => IOption[]; 
  SelectValue:(newValue:any) => void; 
  Toggle:IUseToggle<HTMLDivElement>; 
} 
export function useSelect({ifield, value, setValue, ...props}:IEditor):IUseSelect { 
  const Toggle = useToggle<HTMLDivElement>(true); 

  const multiple = ifield.isArray ?? false; 
  const options = props.options ?? []; 
  // SelectValue ................................
  function SelectValue (newValue:any) { 
    const {inclusion, exclusion} = Filter(ToArray(value), e => e === newValue); 
    if(IsEmpty(inclusion) && multiple) 
      exclusion.push(newValue); 
    if(IsEmpty(inclusion) && !multiple) 
      exclusion[0] = newValue; 
    const selection = multiple ? exclusion: exclusion.shift(); 
    setValue(selection); 
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

  return {ifield, value, setValue, options, multiple, GetSelection, SelectValue, Toggle}; 
} 