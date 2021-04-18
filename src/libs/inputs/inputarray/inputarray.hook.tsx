import { IInput } from '../input/_input'; 
import { IsNull, 
  GetInputType, GetDefaultValueByType} from '../../../libs/_utils'; 
import { IInputArray, IUseInputArray } from './inputarray.type'; 


// USE INPUT ARRAY ========================================
export function useInputArray({...props}:IInputArray):IUseInputArray { 
  props.values = IsNull(props.values) ? []: props.values; 
  props.type = GetInputType(props.type); 
  props.defaultValue = IsNull(props.defaultValue) ? 
    GetDefaultValueByType(props.type) : 
    props.defaultValue; 

  // ElementArgs 
  function ElementArgs(at?:number):IInput { 
    const { type, defaultValue, placeholder, inputAttribute, sizeFunc } = props; 
    const value = props.values[at??-1] ?? defaultValue; 
    const onSetValue = (newValue:any) => {}; 
    const onPressEnter = () => {}; 
    return {type, value, defaultValue, placeholder, onSetValue, onPressEnter, sizeFunc, inputAttribute} 
  }

  // Creates new elements 
  function Create (newValue:any) { 
    props.onSetValues([...props.values, newValue]); 
  }; 
  // Update existing new elements 
  function Update (at:number, newValue:any) { 
    const copy = [...props.values]; 
    copy[at] = newValue; 
    props.onSetValues(copy); 
  }; 
  // Delete existing elements 
  function Delete (at:number) { 
    const copy = [...props.values]; 
    copy.splice(at,1); 
    props.onSetValues(copy); 
  }; 

  return {...props, ElementArgs, Create, Update, Delete}; 
}
