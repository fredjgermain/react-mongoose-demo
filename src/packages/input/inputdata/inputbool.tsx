import React from 'react'; 
import {IInput, useInputHook, EnumType} from '../../_input'; 


// InputBool ================================== 
export default function InputBool(props:IInput<boolean>) { 
  const {value, onChange, onBlur, onPressEnter} = useInputHook<boolean>({...props, type:EnumType.BOOLEAN}); 
  return <input type={'checkbox'} checked={value} 
    onChange={onChange} onBlur={onBlur} onKeyUp={onPressEnter} /> 
} 
