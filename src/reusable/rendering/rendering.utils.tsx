import React, { useEffect, useState } from 'react'; 
import {Input, InputArray, Select} from '../_input'; 
import {GetDefaultValueFromIField} from '../_utils'; 
//import {IFieldToHandler} from '../_rendering'; 
import {useUpdate} from '../customhooks/useupdate.hook'; 



/*
create 3 components 
ifield:IField; 
  value:any; 
  setValue?:React.Dispatch<any>; 
  options?:IOption[]; 

Reader (ifield, value, options?)
  Display type appropriate reader 
  if options is not empty find option mathcing value and display its label. Else display value ... 

Editor
  Display type appropriate editor 
  if options is not empty find option mathcing value and display its label. Else display value ... 

*/



function IFieldToHandler(ifield:IField) { 
  let handler = ''; 
  handler += ifield.isArray === true ? 'Many': 'One'; 
  if(ifield.isEnum) 
    handler += 'Enum'; 
  else if(ifield.isModel) 
    handler += 'Foreign'; 
  else if(ifield.isMixed) 
    handler += 'Mixed'; 
  else 
    handler += 'Primitive'; 
  return handler; 
} 


// Use Try catch if catch use default instead ? 
const Default = (ifield:IField) => (value:any, setValue:any): JSX.Element => { 
  return <span>{JSON.stringify(value)}</span>; 
} 

function ReadFromOptions() {} 

function Read(ifield:IField, value:any) { 
  // Count if Many
  if(ifield.isArray) 
    return <span>{ifield.type} x {value ? (value as any[]).length : 0}</span> 
  // Boolean
  if(ifield.type === 'boolean') 
    return <span>{JSON.stringify(value)}</span> 
  return <span>{value}</span> 
} 

function GetEnumOptions (ifield:IField):IOption[] { 
  const enums:any[] = ifield.enums ?? []; 
  return enums.map( o => { return {value:o, label:o} as IOption} ); 
}

function Selector(value:any[], setValue:any, options:IOption[], multiple:boolean = false) {
  return <Select {...{value, setValue, options, multiple}} /> 
}


// PRIMITIVE --------------------------------------
const OnePrimitiveRead = (ifield:IField) => (value:any, setValue:any) => 
Read(ifield, value); 

const OnePrimitiveEdit = (ifield:IField) => (value:any, setValue:any) => {
const {type, defaultValue} = ifield; 
return <Input {...{value, setValue, type, defaultValue}} /> 
}

const ManyPrimitiveRead = (ifield:IField) => (value:any, setValue:any) => 
Read(ifield, value); 

const ManyPrimitiveEdit = (ifield:IField) => (value:any, setValue:any) => { 
  const {type, defaultValue} = ifield; 
  return <InputArray {...{type, values:value, setValues:setValue, defaultValue}} />
} 


// ENUM -----------------------------------------
const OneEnumRead = (ifield:IField) => (value:any, setValue:any) => 
Read(ifield, value); 

const OneEnumEdit = (ifield:IField) => (value:any, setValue:any) => 
Selector(value, setValue, GetEnumOptions(ifield)); 

const ManyEnumRead = (ifield:IField) => (value:any, setValue:any) => 
Read(ifield, value); 

const ManyEnumEdit = (ifield:IField) => (value:any, setValue:any) => 
Selector(value, setValue, GetEnumOptions(ifield), true); 


// MIXED ----------------------------------------
const OneMixedRead = Default; 

const OneMixedEdit = Default; 

const ManyMixedRead = Default; 

const ManyMixedEdit = Default; 

interface IRendererFuncs { 
  [key:string]:(ifield:IField) => (value:any, setValue:any, options:IOption[]) => JSX.Element; 
} 
const rendererFuncs:IRendererFuncs = {Default, 
OnePrimitiveRead, OnePrimitiveEdit, ManyPrimitiveRead, ManyPrimitiveEdit, 
OneEnumRead, OneEnumEdit, ManyEnumRead, ManyEnumEdit, 
OneMixedRead, OneMixedEdit, ManyMixedRead, ManyMixedEdit}; 



interface IRenderer { 
  ifield:IField; 
  value:any; 
  setValue?:React.Dispatch<any>; 
  options?:IOption[]; 
  suffix?:string; 
} 
export function Renderer({
  ifield, 
  value = GetDefaultValueFromIField(ifield), 
  setValue = () => {}, 
  options = [], 
  suffix = ''
}:IRenderer) 
{ 
  const [valueToRender, setValueToRender] = useState(value); 

  // synchronize from parent value
  useEffect(() => { 
    if(value !== valueToRender) 
      setValueToRender(value); 
  }, [value]); 

  // synchronize to parent value 
  useUpdate(() => {setValue(valueToRender)},valueToRender); 

  const handler = `${IFieldToHandler(ifield)}${suffix}`; 
  const renderer = (rendererFuncs[handler] ?? rendererFuncs['Default'])(ifield); 

  return <span>{renderer(valueToRender, setValueToRender, options)}</span> 
}