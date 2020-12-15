import React from 'react'; 
import {IColumnSettingRule, IDao, ITableHook} from '../custompackages'; 
import {InputArray, InputData, InputSelect} from '../custompackages'; 
import {Field} from '../custompackages'; 

// IField Predicate ===============================
const OnePrimitive = (ifield:IField) => !new Field(ifield).IsArray() && new Field(ifield).IsPrimitive(); 
const OneEnum = (ifield:IField) => !new Field(ifield).IsArray() && new Field(ifield).IsEnum(); 
const OneForeign = (ifield:IField) => !new Field(ifield).IsArray() && new Field(ifield).IsObjectID(); 
const ManyPrimitive = (ifield:IField) => new Field(ifield).IsArray() && new Field(ifield).IsPrimitive(); 
const ManyEnum = (ifield:IField) => new Field(ifield).IsArray() && new Field(ifield).IsEnum(); 
const ManyForeign = (ifield:IField) => new Field(ifield).IsArray() && new Field(ifield).IsObjectID(); 

// icolumn Predicate ======================================
const editable = (handle?:string) => { 
  if(!handle) 
    return false; 
  return handle === 'update' || handle === 'create'; 
}; 


// BuildRenderFunc =====================================
const ReadMany = (ifield:IField, value:any) => { 
  const N = Array.isArray(value) ? value: []; 
  return <span>{new Field(ifield).GetElementType()} x {N.length}</span> 
}

const Display = (ifield:IField, value:any) => { 
  if(ifield.type === 'boolean') 
    return <span>{JSON.stringify(value)}</span>; 
  return <span>{value}</span>; 
}

// PRIMITIVE --------------------------------------
const ReadOnePrimitive = (ifield:IField, dao:IDao) => { 
  return (value:any, onSendValue:any) => { 
    return Display(ifield, value); 
}}; 

const EditOnePrimitive = (ifield:IField, dao:IDao) => {
  return (value:any, onSendValue:any) => { 
    return <InputData {...{value, onSendValue}} /> 
}}; 

const ReadManyPrimitive = (ifield:IField, dao:IDao) => {
  return (value:any, onSendValue:any) => { 
    return ReadMany(ifield, value); 
}}; 

const EditManyPrimitive = (ifield:IField, dao:IDao) => {
  return (value:any, setValue:any):any => { 
    return <InputArray type={ifield.type} value={value} onSendValue={setValue} defaultValue={ifield.defaultValue} /> 
}}; 


// ENUM -----------------------------------------
const ReadOneEnum = (ifield:IField, dao:IDao) => { 
  return (value:any, onSendValue:any) => { 
    return <span>{value}</span>; 
}}; 

const EditOneEnum = (ifield:IField, dao:IDao) => { 
  const enums:any[] = ifield.options['enum'] ?? []; 
  const options = enums.map( o => {
    return {value:o, label:o} as IOption} 
  ); 
  return (value:any, onSendValue:any) => { 
    return <InputSelect {...{value, onSendValue, options}} /> 
}}; 

const ReadManyEnum = (ifield:IField, dao:IDao) => {
  return (value:any, onSendValue:any) => { 
    return ReadMany(ifield, value); 
}}; 

const EditManyEnum = (ifield:IField, dao:IDao) => { 
  const enums:any[] = ifield.options['enum'] ?? []; 
  const options = enums.map( o => {
    return {value:o, label:o} as IOption} 
  ); 
  return (value:any, onSendValue:any) => { 
    return <InputSelect {...{value, onSendValue, options, isMulti:true}} /> 
}}; 

// FOREIGN --------------------------------------
const ReadOneForeign = (ifield:IField, dao:IDao) => { 
  return (value:any, onSendValue:any):any => { 
    const foreignValue:any = dao.GetForeignValue(ifield, value); 
    return <span>{JSON.stringify(foreignValue)}</span>; 
  } 
} 

const EditOneForeign = (ifield:IField, dao:IDao) => { 
  return (value:any, onSendValue:any) => { 
    const options:IOption[] = dao.GetForeignOptions(ifield); 
    return <InputSelect {...{value, onSendValue, options}} /> 
}}; 

const ReadManyForeign = (ifield:IField, dao:IDao) => { 
  return (value:any, onSendValue:any) => { 
    return ReadMany(ifield, value); 
}}; 

const EditManyForeign = (ifield:IField, dao:IDao) => { 
  return (value:any, onSendValue:any) => { 
    const options:IOption[] = dao.GetForeignOptions(ifield); 
    return <InputSelect {...{value, onSendValue, options, isMulti:true}} /> 
}}; 


// Column Setting Rules -------------------------
const defOps = {order:0, show:true, sort:0}
export const icolrules:IColumnSettingRule[] = [ 
  
  // Primitive
  {...defOps, ifieldPredicate:OnePrimitive, buildRenderer: ReadOnePrimitive}, 
  {...defOps, ifieldPredicate:OnePrimitive, buildRenderer: EditOnePrimitive, predicate:editable}, 
  {...defOps, ifieldPredicate:ManyPrimitive, buildRenderer: ReadManyPrimitive}, 
  {...defOps, ifieldPredicate:ManyPrimitive, buildRenderer: EditManyPrimitive, predicate:editable}, 

  // Enum
  {...defOps, ifieldPredicate:OneEnum, buildRenderer: ReadOneEnum}, 
  {...defOps, ifieldPredicate:OneEnum, buildRenderer: EditOneEnum, predicate:editable}, 
  {...defOps, ifieldPredicate:ManyEnum, buildRenderer: ReadManyEnum}, 
  {...defOps, ifieldPredicate:ManyEnum, buildRenderer: EditManyEnum, predicate:editable}, 

  // Foreign
  {...defOps, ifieldPredicate:OneForeign, buildRenderer: ReadOneForeign}, 
  {...defOps, ifieldPredicate:OneForeign, buildRenderer: EditOneForeign, predicate:editable}, 
  {...defOps, ifieldPredicate:ManyForeign, buildRenderer: ReadManyForeign}, 
  {...defOps, ifieldPredicate:ManyForeign, buildRenderer: EditManyForeign, predicate:editable}, 
] 