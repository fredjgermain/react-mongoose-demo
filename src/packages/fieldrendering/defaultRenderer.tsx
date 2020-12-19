import React from 'react'; 
import {Field} from '../_mongoosedao'; 
import {InputArray, InputData, InputSelect} from '../_input'; 


type TForeignValue = (ifield:IField, id:string) => any|undefined; 
type TForeignOptions = (ifield:IField) => IOption[]; 

// BUILD FIELD RENDERING =================================
export function GetDefaultRenderer(GetForeignOptions:TForeignOptions, GetForeignValue:TForeignValue) { 
  // BuildRenderFunc -------------------------------------
  const ReadMany = (ifield:IField, value:any) => { 
    const N = Array.isArray(value) ? value: []; 
    return <span>{new Field(ifield).GetElementType()} x {N.length}</span> 
  } 

  const Display = (ifield:IField, value:any) => { 
    if(ifield.type === 'boolean') 
      return <span>{JSON.stringify(value)}</span>; 
    return <span>{value}</span>; 
  } 

  const Default = (ifield:IField) => (value:any, onSendValue:any) => { 
    return <span>{JSON.stringify(value)}</span>; 
  }

  // PRIMITIVE --------------------------------------
  const ReadOnePrimitive = (ifield:IField) => (value:any, onSendValue:any) => 
    Display(ifield, value); 

  const EditOnePrimitive = (ifield:IField) => (value:any, onSendValue:any) => 
    <InputData {...{value, onSendValue}} /> 

  const ReadManyPrimitive = (ifield:IField) => (value:any, onSendValue:any) => 
    ReadMany(ifield, value); 

  const EditManyPrimitive = (ifield:IField) => (value:any, setValue:any) => 
    <InputArray type={ifield.type} value={value} onSendValue={setValue} defaultValue={ifield.defaultValue} /> 

  // ENUM -----------------------------------------
  const ReadOneEnum = (ifield:IField) => (value:any, onSendValue:any) => 
    <span>{value}</span>; 

  const EditOneEnum = (ifield:IField) => (value:any, onSendValue:any) => { 
      const enums:any[] = ifield.options['enum'] ?? []; 
      const options = enums.map( o => {
        return {value:o, label:o} as IOption} 
      ); 
      return <InputSelect {...{value, onSendValue, options}} /> 
    }; 

  const ReadManyEnum = (ifield:IField) => (value:any, onSendValue:any) => 
    ReadMany(ifield, value); 

  const EditManyEnum = (ifield:IField) => (value:any, onSendValue:any) => { 
      const enums:any[] = ifield.options['enum'] ?? []; 
      const options = enums.map( o => { 
        return {value:o, label:o} as IOption} 
      ); 
      return <InputSelect {...{value, onSendValue, options, isMulti:true}} /> 
    }; 

  // FOREIGN --------------------------------------
  const ReadOneForeign = (ifield:IField) => (value:any, onSendValue:any) => { 
      const foreignValue:any = GetForeignValue(ifield, value); 
      return <span>{JSON.stringify(foreignValue)}</span>; 
    } 

  const EditOneForeign = (ifield:IField) => (value:any, onSendValue:any) => { 
      const options:IOption[] = GetForeignOptions(ifield); 
      return <InputSelect {...{value, onSendValue, options}} /> 
    }; 

  const ReadManyForeign = (ifield:IField) => (value:any, onSendValue:any) => 
    ReadMany(ifield, value); 

  const EditManyForeign = (ifield:IField) => (value:any, onSendValue:any) => { 
      const options:IOption[] = GetForeignOptions(ifield); 
      return <InputSelect {...{value, onSendValue, options, isMulti:true}} /> 
    }; 
  const read = {ReadOnePrimitive, ReadManyPrimitive, ReadOneEnum, ReadManyEnum, ReadOneForeign, ReadManyForeign}; 
  const edit = {EditOnePrimitive, EditManyPrimitive, EditOneEnum, EditManyEnum, EditOneForeign, EditManyForeign}; 
  return {...read, ...edit, Default}; 
}