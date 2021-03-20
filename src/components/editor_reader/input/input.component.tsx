/*
This component serves as a wrapper for regular 'input' fields. 
Makes it easier to edit and get changes from regular 'input' fields with their correct types. 
*/ 
import React from 'react'; 
//import CSS from ''
import {IEvent, IsNull, OnEnter, SetSize, 
  GetValueFromInput, GetInputType} from '../../../reusable/_utils'; 


export interface IInput { 
  _type: string; 
  _value:any; 
  _defaultValue: any; 
  _onChange: (newValue:any) => void; 
  _onPressEnter?: () => void; 
  _width?: (value:any) => number; 
} 
// INPUT =================================================
interface IProps extends IInput, React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {} 
/*export default function Input({_type, _value, _defaultValue, _onChange, _onPressEnter, _width,
  children, ...inputArgs}:React.PropsWithChildren<IProps>) { */

export function Input({_type, _value, _defaultValue, 
  _onChange, _onPressEnter, _width, 
  ...inputArgs}:IProps) { 
  
  const type = GetInputType(_type); 
  const value = IsNull(_value) ? _defaultValue: _value; 

  const onChange = (event:IEvent) => { 
    const valueFromInput = GetValueFromInput(event); 
    const newValue = IsNull(valueFromInput) ? _defaultValue : valueFromInput; 
    if(JSON.stringify(newValue) !== JSON.stringify(_value) ) 
      _onChange(newValue); 
  } 

  const onKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => OnEnter(event, _onPressEnter); 

  const style = _width ? 
    {width: `${_width(value)+2}ch`}: 
    {width: `${SetSize(value)+2}ch`}; 
  
  if(type==='checkbox') 
    return <input {...{inputArgs, type, checked:value, onChange, onKeyUp} } /> 
  return <input {...{inputArgs}} {...{type, value, onChange, onKeyUp, style}} /> 
}

