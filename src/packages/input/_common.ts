import InputData from './inputdata/inputdata'; 
import InputString from './inputdata/inputstring'; 
import InputNumber from './inputdata/inputnumber'; 
import InputBool from './inputdata/inputbool'; 
import InputSelect from './inputselect/inputselect'; 
import InputArray from './inputarray'; 
import {useInputHook} from './inputhooks/inputhook'; 

export {useInputHook, InputData, InputBool, InputNumber, InputString, InputSelect, InputArray}; 
export type InputAction = (event:any) => void; 


// Props to be sent from a parent to a Input component 
export interface IInput<T> { 
  value: T; 
  type?: string; 
  //size?: any; 
  useref?: any;                        // gives parent component access to these values and methods

  // Formatting .................................
  formatter?: (value:T) => T; 

  // Editing ....................................
  onSendValue: (value:T) => void; // defined by parent component 
  onChange?: InputAction;      // called when <input> changes. 
  onBlur?: InputAction;        // called when <input> blurs. 
  onPressEnter?: InputAction;  // called when <input> press enter. 
  onFocus?: InputAction;       // called when component is being focused on. 

  // Validations ................................
  validation?: (value:T) => boolean; 
  onValid?: () => void; 
} 



export enum EnumType { 
  STRING = 'string', 
  NUMBER = 'number', 
  BOOLEAN = 'boolean', 
  FUNCTION = "function", 
  DATE = 'date', 
  OBJECT = 'object', 
  ARRAY = 'array', 
  ANY = 'any', 
  NULL = 'null', 
} 

  
// SetSize 
export function SetSize(value:any) { 
  const w = String(value).length; 
  return w < 5 ? 5 : w; 
} 

// Infer value type
export function InferValueType(value:any):EnumType { 
  if(Array.isArray(value)) 
    return EnumType.ARRAY; 
  
  switch(typeof value) { 
    case EnumType.STRING: 
      return EnumType.STRING; 
    case EnumType.NUMBER: 
      return EnumType.NUMBER; 
    case EnumType.BOOLEAN:
      return EnumType.BOOLEAN;
    case EnumType.OBJECT: 
      return EnumType.OBJECT; 
  } 
  return EnumType.NULL; 
} 

// Infer default value
export function InferDefaultValue(value:any, type?:string) { 
  let foundType = type ?? InferValueType(value); 
  switch(foundType) { 
    case EnumType.STRING: 
      return ''; 
    case EnumType.NUMBER: 
      return 0; 
      case EnumType.BOOLEAN: 
      return false; 
    case EnumType.OBJECT: 
      return {}; 
    case EnumType.ARRAY: 
      return []; 
    default: 
      return null; 
  }
} 
