import React from 'react'; 


/*import {Input} from '../input/_input'


export const Default = (ifield:IField) => (value:any, returnValue:any) => { 
  return <span>{JSON.stringify(value)}</span>; 
} 

// BUILD FIELD RENDERING =================================
export function GetDefaultRenderer(GetForeignOptions:(ifield:IField) => IOption[], GetForeignValue:(ifield:IField, id:string) => any|undefined) { 
  // BuildRenderFunc -------------------------------------
  const ReadMany = (ifield:IField, value:any) => { 
    const N = Array.isArray(value) ? value: []; 
    return <span>{ifield.type} x {N.length}</span> 
  } 

  const Display = (ifield:IField, value:any) => { 
    if(ifield.type === 'boolean') 
      return <span>{JSON.stringify(value)}</span>; 
    return <span>{value}</span>; 
  } 

  // PRIMITIVE --------------------------------------
  const ReadOnePrimitive = (ifield:IField) => (value:any, returnValue:any) => 
    Display(ifield, value); 

  const EditOnePrimitive = (ifield:IField) => (value:any, returnValue:any) => 
    <InputData {...{value, type:ifield.type, returnValue}} /> 


  const ReadManyPrimitive = (ifield:IField) => (value:any, returnValue:any) => 
    ReadMany(ifield, value); 

  const EditManyPrimitive = (ifield:IField) => (value:any, setValue:any) => 
    <InputArray {...{type:ifield.type, values:value, returnValues:setValue, defaultValue:ifield.defaultValue}} /> 

  // ENUM -----------------------------------------
  const ReadOneEnum = (ifield:IField) => (value:any, returnValue:any) => 
    <span>{value}</span>; 

  const EditOneEnum = (ifield:IField) => (value:any, returnValue:any) => { 
      const enums:any[] = ifield.options['enum'] ?? []; 
      const options = enums.map( o => { 
        return {value:o, label:o} as IOption} 
      ); 
      return <Selecter {...{value, type:'', returnValue, options}} /> 
    }; 

  const ReadManyEnum = (ifield:IField) => (value:any, returnValue:any) => 
    ReadMany(ifield, value); 

  const EditManyEnum = (ifield:IField) => (value:any, returnValue:any) => { 
      const enums:any[] = ifield.options['enum'] ?? []; 
      const options = enums.map( o => { 
        return {value:o, label:o} as IOption} 
      ); 
      return <Selecter {...{value, type:ifield.type, returnValue, options}} /> 
    }; 

  // FOREIGN --------------------------------------
  const ReadOneForeign = (ifield:IField) => (value:any, returnValue:any) => { 
      const foreignValue:any = GetForeignValue(ifield, value); 
      return <span>{JSON.stringify(foreignValue)}</span>; 
    } 

  const EditOneForeign = (ifield:IField) => (value:any, returnValue:any) => { 
      const options:IOption[] = GetForeignOptions(ifield); 
      return <Selecter {...{value, type:ifield.type, returnValue, options}} /> 
    }; 

  const ReadManyForeign = (ifield:IField) => (value:any, returnValue:any) => 
    ReadMany(ifield, value); 

  const EditManyForeign = (ifield:IField) => (value:any, returnValue:any) => { 
      const options:IOption[] = GetForeignOptions(ifield); 
      return <Selecter {...{value, type:ifield.type, returnValue, options, isMulti:true}} /> 
    }; 
  const read = {ReadOnePrimitive, ReadManyPrimitive, ReadOneEnum, ReadManyEnum, ReadOneForeign, ReadManyForeign}; 
  const edit = {EditOnePrimitive, EditManyPrimitive, EditOneEnum, EditManyEnum, EditOneForeign, EditManyForeign}; 
  return {...read, ...edit, Default}; 
}*/