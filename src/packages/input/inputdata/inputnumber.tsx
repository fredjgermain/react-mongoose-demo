import React from 'react'; 
import {IInput, useInputHook, SetSize, EnumType} from '../../_input'; 


// InputNumber ================================== 
export default function InputNumber(props:IInput<number>) { 
  const {value, onChange, onBlur, onPressEnter} = useInputHook<number>({...props, type:EnumType.NUMBER}); 
  const style = {width:`${SetSize(value)+2}ch`}; 
  return <input type={'number'} value={value} style={style} 
    onChange={onChange} onBlur={onBlur} onKeyUp={onPressEnter} /> 
} 
