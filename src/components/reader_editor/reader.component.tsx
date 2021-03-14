//import { GetDefaultValueFromIField, GetSelectedValuesFromOptions, IsEmpty } from "../../reusable/_utils";
import {IReader, IReaderFunc, GetReadValue, GetDefaultReaderFunc} from './editor_reader.utils'; 

interface IProps extends IReader { 
  func:IReaderFunc; 
} 


export default function Reader({ifield, options=[], ...props}:IProps) { 
  const value = GetReadValue(props.value, options, ifield); 
  props.func = props.func ?? GetDefaultReaderFunc(ifield); 
  return <props.func {...{value, options, ifield}} /> 
} 

