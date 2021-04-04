import { GetDefaultValueFromIField, GetSelectedValuesFromOptions, IsEmpty } from "../../../reusable/_utils";


export type IReaderFunc = ({...props}:IReader) => JSX.Element; 
export interface IReader { 
  value:any; 
  options?:IOption[]; 
  ifield:IField;    // type:IType ?? 
} 
interface IProps extends IReader { 
  func?:IReaderFunc; 
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

export function Reader({ifield, options=[], ...props}:IProps) { 
  const value = GetReadValue(props.value, options, ifield); 
  props.func = props.func ?? GetDefaultReaderFunc(ifield); 
  return <props.func {...{value, options, ifield}} /> 
} 


function ReadOne({value, options, ifield}:IReader) { 
  if(ifield.type === 'string' || ifield.type === 'number') 
    return <div>{value}</div> 
  return <div>{JSON.stringify(value)}</div> 
} 

function ReadMany({value, options, ifield}:IReader) { 
  const isShort = JSON.stringify(value).length < 15; 

  if(!Array.isArray(value)) 
    return <div>{JSON.stringify(value)}</div> 

  if(isShort) { 
    return <div>[{value.map( (e, i) => { 
        return <div key={i}>{i!==0 && ', '}{JSON.stringify(e)}</div> 
    })}]</div> 
  } 
  return <div> 
    <div className={'readmany-long'}> 
      {value.map( (e, i) => { 
        return <div key={i}>{i}. {JSON.stringify(e)}</div> 
      })} 
    </div> 
  </div>
} 


function ReadMixed({value, options, ifield}:IReader) { 
  return <div>{JSON.stringify(value)}</div> 
} 

function ReadDefault({value, options, ifield}:IReader) { 
  return <div>{JSON.stringify(value)}</div> 
} 