import React from 'react'; 
import {useInput} from './useInput.hook'; 
import {IInput, SetSize} from '../input.utils'; 

// INPUT DATA ===================================
export default function InputData(props:IInput) { 
  const type = props.type ?? typeof props.value
  if(type === 'number') 
    return <InputNumber {...props} /> 
  if(type === 'boolean') 
    return <InputBoolean {...props} /> 
  return <InputString {...props} /> 
}

export function InputNumber(props:IInput) { 
  const {value, type, setValue, useref, returnValue, onBlur, onChange, onPressEnter, ...options} = useInput(props); 
  const style = {width:`${SetSize(value)+2}ch`}; 
  return <input {...{value, type, style, onChange, onBlur, onKeyUp:onPressEnter, options}} /> 
}

export function InputString(props:IInput) { 
  const {value, type, setValue, useref, returnValue, onBlur, onChange, onPressEnter, ...options} = useInput(props); 
  const style = {width:`${SetSize(value)+2}ch`}; 
  return <input {...{value, type:'text', style, onChange, onBlur, onKeyUp:onPressEnter, options}} /> 
}

export function InputBoolean(props:IInput) { 
  const {value, type, setValue, useref, returnValue, onBlur, onChange, onPressEnter, ...options} = useInput(props); 
  return <input {...{checked:value, type:'checkbox', onChange, onBlur, onKeyUp:onPressEnter, options}} /> 
}

