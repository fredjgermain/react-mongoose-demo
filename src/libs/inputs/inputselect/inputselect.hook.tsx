import { Filter, ToArray } from '../../../libs/_arrayutils';
import { GetSelectedValuesFromOptions, IsEmpty } from '../../../libs/_utils';


export interface IInputSelect { 
  value:any; 
  placeholder?:string; 
  onSetValue: (newValues:any[]) => void; 
  options: IOption[]; 
  multiple?: boolean; 
  sizeFunc?: (value:any) => number; 
} 


// USE SELECT ====================================
export interface IUseSelect extends IInputSelect { 
  SelectValue:(newValue:any) => void; 
  GetSelection: () => IOption[]; 
  //Toggle:IUseToggle<HTMLDivElement>; 
} 
export function useInputSelect({...props}:IInputSelect):IUseSelect { 
  props.multiple = props.multiple ?? false; 
  props.options = props.options ?? []; 
  props.placeholder = props.placeholder ?? "--- Empty ---"; 

  // SelectValue ................................
  function SelectValue (newValue:any) { 
    const [inclusion, exclusion] = Filter(ToArray(props.value), e => e === newValue); 
    if(IsEmpty(inclusion) && props.multiple) 
      exclusion.push(newValue); 
    if(IsEmpty(inclusion) && !props.multiple) 
      exclusion[0] = newValue; 
    const selectionFromOptions = GetSelectedValuesFromOptions(exclusion, props.options).map( o => o.value); 
    const selection = props.multiple ? selectionFromOptions: selectionFromOptions.shift(); 
    //const selection = _multiple ? exclusion: exclusion.shift(); 
    props.onSetValue(selection); 
  } 

  function GetSelection() { 
    return GetSelectedValuesFromOptions(props.value, props.options); 
  }

  return {...props, SelectValue, GetSelection}; 
} 