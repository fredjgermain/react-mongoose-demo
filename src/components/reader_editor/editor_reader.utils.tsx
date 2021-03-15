import { Input } from "../../reusable/_input";
import { GetDefaultValueFromIField, GetSelectedValuesFromOptions, IsEmpty } from "../../reusable/_utils";


export type IReaderFunc = ({...props}:IReader) => JSX.Element; 
export interface IReader { 
  value:any; 
  options?:IOption[]; 
  ifield:IField;    // type:IType ?? 
} 


export type IEditorFunc = ({...props}:IEditor) => JSX.Element; 
export interface IEditor extends IReader { 
  editValue: (newValue:any) => void; 
  validators?:any; 
  placeholder?:any; 
}


export function GetReadValue(value:any, options:IOption[], ifield:IField) { 
  return IsEmpty(options) ? 
    value ?? GetDefaultValueFromIField(ifield): 
    GetSelectedValuesFromOptions(value, options).map(o=>o.label); 
} 

export function GetDefaultReaderFunc(ifield:IField) { 
  if(ifield.isArray) 
    return ReadMany; 
  if(ifield.isMixed) 
    return ReadMixed; 
  return ReadOne; 
} 

export function GetDefaultEditorFunc(ifield:IField) { 
  if(ifield.isArray) 
    return EditMany; 
  if(ifield.isMixed) 
    return EditMixed; 
  return EditOne; 
} 

function EditOne({value, editValue, options, ifield}:IEditor) { 

  return <div> EDIT ONE </div>
}

function EditMany({value, editValue, options, ifield}:IEditor) { 
  return <div>
    Edit Many
  </div>
}

function EditMixed({value, editValue, options, ifield}:IEditor) { 
  return <div>
    Edit Mixed
  </div>
}



function ReadOne({value, options, ifield}:IReader) { 
  if(ifield.type === 'boolean') 
    return <span>{JSON.stringify(value)}</span> 
  return <span>{value}</span> 
} 

function ReadMany({value, options, ifield}:IReader) { 
  const isShort = JSON.stringify(value).length < 15; 

  if(!Array.isArray(value)) 
    return <span>{JSON.stringify(value)}</span> 

  if(isShort) { 
    return <span>[{value.map( (e, i) => { 
        return <span key={i}>{i!==0 && ', '}{JSON.stringify(e)}</span> 
    })}]</span> 
  } 
  return <span> 
    <div className={'readmany-long'}> 
      {value.map( (e, i) => { 
        return <div key={i}>{i}. {JSON.stringify(e)}</div> 
      })} 
    </div> 
  </span>
} 


function ReadMixed({value, options, ifield}:IReader) { 
  return <div>{JSON.stringify(value)}</div> 
} 

function ReadDefault({value, options, ifield}:IReader) { 
  return <div>{JSON.stringify(value)}</div> 
} 