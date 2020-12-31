// Input Data
import InputData, {InputBoolean, InputNumber, InputString} from './input/inputdata/inputdata.component'; 
import {GetValueFromInput, IEvent, IInput, IOption, IsPressEnter, SetSize} from './input/input.utils'; 
import Show from './input/show/show.component'; 

// InputArray
import InputArray from './input/inputarray/inputarray.component'; 

export {InputData, InputBoolean, InputNumber, InputString, 
  InputArray, 
  Show, 
  GetValueFromInput, IsPressEnter, SetSize
}; 
export type {IEvent, IInput, IOption}; 
