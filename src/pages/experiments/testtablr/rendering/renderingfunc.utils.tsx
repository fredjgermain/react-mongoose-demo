import React from 'react'; 
import {Arrx, Elements, ElementValue} from '../../../../reusable/components/arrx/_arrx'; 
import {Input, InputArray, Select, Options} from '../../../../reusable/components/input/_input'; 



type Func = (ifield:IField) => (value:any, setValue:React.Dispatch<any>) => JSX.Element|any; 


const GetForeignValue = (ifield:IField, value:any):IOption[] => [] as IOption[]; 
const GetForeignOptions = (ifield:IField):any => [] as IOption[]; 


function Read(ifield:IField, value:any) { 
  // Count if Many
  if(ifield.isArray) 
    return <span>{ifield.type} x {value ? (value as any[]).length : 0}</span> 
  // Boolean
  if(ifield.type === 'boolean') 
    return <span>{JSON.stringify(value)}</span> 
  return <span>{value}</span> 
} 



// PRIMITIVE --------------------------------------
const OnePrimitiveRead = (ifield:IField) => (value:any, setValue:any) => Read(ifield, value); 

const OnePrimitiveEdit = (ifield:IField) => (value:any, setValue:any) => <Input {...{value, setValue}} /> 

const ManyPrimitiveRead = (ifield:IField) => (value:any, setValue:any) => Read(ifield, value); 

const ManyPrimitiveEdit = (ifield:IField) => (value:any, setValue:any) => { 
    const {type, defaultValue} = ifield; 
    return <InputArray {...{type, values:value, setValues:setValue, defaultValue}} /> 
  } 


// ENUM -----------------------------------------
const ReadOneEnum = (ifield:IField) => (value:any, setValue:any) => Read(ifield, value); 

const EditOneEnum = (ifield:IField) => (value:any, setValue:any) => { 
    const enums:any[] = ifield.enums ?? []; 
    const options = enums.map( o => { 
      return {value:o, label:o} as IOption} 
    ); 
    return <Select {...{value, setValue}} > 
      <Options {...{options}} /> 
    </Select> 
  }; 

const ReadManyEnum = (ifield:IField) => (value:any, setValue:any) => Read(ifield, value); 

const EditManyEnum = (ifield:IField) => (value:any, setValue:any) => { 
    const enums:any[] = ifield.enums ?? []; 
    const options = enums.map( o => { 
      return {value:o, label:o} as IOption} 
    ); 
    return <Select {...{value, setValue, multiple:true}} > 
      <Options {...{options}} /> 
    </Select> 
  }; 

// FOREIGN --------------------------------------
const ReadOneForeign = (ifield:IField) => (value:any, setValue:any) => { 
    const foreignValue:any = GetForeignValue(ifield, value); 
    return <span>{JSON.stringify(foreignValue)}</span>; 
  } 

const EditOneForeign = (ifield:IField) => (value:any, setValue:any) => { 
    const options:IOption[] = GetForeignOptions(ifield); 
    return <Select {...{value, setValue, multiple:true}} > 
      <Options {...{options}} /> 
    </Select>
  }; 

const ReadManyForeign = (ifield:IField) => (value:any, setValue:any) => Read(ifield, value); 

const EditManyForeign = (ifield:IField) => (value:any, setValue:any) => { 
    const options:IOption[] = GetForeignOptions(ifield); 
    return <Select {...{value, setValue, multiple:true}} > 
      <Options {...{options}} /> 
    </Select> 
  }; 

export const DefaultRenderingFunc:{handle:string, func:Func}[] = [ 
  {handle: 'OnePrimitiveRead', func: OnePrimitiveRead}, 
]