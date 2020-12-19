import React from 'react'; 
import {IInput, useInputHook, SetSize, EnumType} from '../../_input'; 


// InputString ================================== 
export default function InputString(props:IInput<string>) { 
  const {value, onChange, onBlur, onPressEnter} = useInputHook<string>({...props, type:EnumType.STRING}); 
  const style = {width:`${SetSize(value)}ch`}; 
  return <input type={'text'} value={value} style={style} 
    onChange={onChange} onBlur={onBlur} onKeyUp={onPressEnter} /> 
} 
