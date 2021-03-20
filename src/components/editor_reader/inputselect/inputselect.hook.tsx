import { Filter, ToArray } from '../../../reusable/_arrayutils';
import { GetSelectedValuesFromOptions, IsEmpty } from '../../../reusable/_utils';


export interface IInputSelect { 
  _value:any; 
  _onChange: (newValues:any[]) => void; 
  _options: IOption[]; 
  _multiple?: boolean; 
  _width?: (value:any) => number; 
} 


// USE SELECT ====================================
export interface IUseSelect extends IInputSelect { 
  SelectValue:(newValue:any) => void; 
  GetSelection: () => IOption[]; 
  //Toggle:IUseToggle<HTMLDivElement>; 
} 
export function useInputSelect({_value, _options = [], _onChange, _multiple = false, _width}:IInputSelect):IUseSelect {   

  // SelectValue ................................
  function SelectValue (newValue:any) { 
    const [inclusion, exclusion] = Filter(ToArray(_value), e => e === newValue); 
    if(IsEmpty(inclusion) && _multiple) 
      exclusion.push(newValue); 
    if(IsEmpty(inclusion) && !_multiple) 
      exclusion[0] = newValue; 
    const selectionFromOptions = GetSelectedValuesFromOptions(exclusion, _options).map( o => o.value); 
    const selection = _multiple ? selectionFromOptions: selectionFromOptions.shift(); 
    //const selection = _multiple ? exclusion: exclusion.shift(); 
    _onChange(selection); 
  } 

  function GetSelection() { 
    return GetSelectedValuesFromOptions(_value, _options); 
  }

  return {_value, _onChange, _options, _multiple, _width, SelectValue, GetSelection}; 
} 