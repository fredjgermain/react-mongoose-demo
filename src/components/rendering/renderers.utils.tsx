import React from 'react'; 
import {Input, InputArray, Select, Options} from '../../reusable/components/input/_input'; 


export interface IRenderers { 
  [key:string]:(ifield:IField) => (value:any, setValue:any) => JSX.Element; 
} 

const Default = (ifield:IField) => (value:any, setValue:any): JSX.Element => { 
  return <span>{JSON.stringify(value)}</span>; 
} 

export function GetRenderingFunc(renderers:IRenderers, handler?:string) { 
  return renderers[handler??'Default'] ?? Default; 
} 

export function IFieldToHandler(ifield:IField) { 
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
  return <Select {...{value, setValue, multiple}}  > 
      <Options {...{options}} /> 
    </Select> 
}


// DEFAULT RENDERING FUNCTIONS =======================
export function BuildDefaultRenderingFunc ( 
  GetForeignElements: (ifield:IField) => {foreignCollection:ICollection|undefined, abbrevField:IField|undefined}, 
  GetForeignOptions: (ifield:IField) => IOption[], 
  GetForeignValues: (ifield:IField, value:any[]) => any[] 
): IRenderers
{ 
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


  // FOREIGN --------------------------------------
  const OneForeignRead = (ifield:IField) => (value:any, setValue:any) => {
    const {abbrevField} = GetForeignElements(ifield); 
    if(abbrevField) 
      return Read(abbrevField, GetForeignValues(ifield, value)[0] ?? abbrevField.defaultValue); 
    return Read(ifield, value ?? ''); 
  } 

  const OneForeignEdit = (ifield:IField) => (value:any, setValue:any) => {
    return Selector(value, setValue, GetForeignOptions(ifield)); 
  }
    

  const ManyForeignRead = (ifield:IField) => (value:any, setValue:any) => 
    Read(ifield, value); 

  const ManyForeignEdit = (ifield:IField) => (value:any, setValue:any) => 
    Selector(value, setValue, GetForeignOptions(ifield), true); 

  return {Default, OnePrimitiveRead, OnePrimitiveEdit, ManyPrimitiveRead, ManyPrimitiveEdit, 
    OneEnumRead, OneEnumEdit, ManyEnumRead, ManyEnumEdit, 
    OneMixedRead, OneMixedEdit, ManyMixedRead, ManyMixedEdit, 
    OneForeignRead, OneForeignEdit, ManyForeignRead, ManyForeignEdit}; 
}
