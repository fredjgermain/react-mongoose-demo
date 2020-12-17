import React from 'react'; 
import { IInput, InputNumber, InputString, InputBool } from '../inputcommon'; 

// InputData ====================================
export default function InputData(props:IInput<any>) { 
  // input type check box
  if(typeof props.value === 'boolean') 
    return <InputBool {...props} /> 
  // input type number 
  if(typeof props.value === 'number') 
    return <InputNumber {...props} /> 
  
  // type Date ???

  // input type text - used as default input type. 
  return <InputString {...props} /> 
}