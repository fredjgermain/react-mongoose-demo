import React from 'react'; 
import {GetDefaultValueFromIField, ToArray, IsEmpty} from '../../_utils'; 

import './readmany.css'; 


// Reader =======================================
interface IReader{ 
  ifield:IField, 
  value:any, 
  options?:IOption[]; 
} 
export function Reader({ ifield, value=GetDefaultValueFromIField(ifield), options=[] }:IReader) { 
  const valueToDisplay = IsEmpty(options) ? value:
    options.filter( o => ToArray(value).includes(o.value)).map(o=>o.label)

  if(ifield.isArray) 
    return <ReadMany {...{ifield, value:valueToDisplay}} /> 
  if(ifield.isMixed) 
    return <ReadMixed {...{ifield, value:valueToDisplay}} /> 
  return <ReadOne {...{ifield, value:valueToDisplay}} /> 
}



// READ ONE ====================================
interface IRead{ 
  ifield:IField, 
  value:any, 
} 
export function ReadOne({ifield, value=GetDefaultValueFromIField(ifield)}:IRead) { 
  if(ifield.type === 'boolean') 
    return <span>{JSON.stringify(value)}</span> 
  return <span>{value}</span> 
} 



// READ MANY ====================================
export function ReadMany({ifield, value=[]}:IRead) { 
  const isShort = JSON.stringify(value).length < 15; 

  if(!Array.isArray(value)) 
    return <span>{JSON.stringify(value)}</span> 

  if(isShort) { 
    return <span>[{value.map( (e, i) => { 
      return <span>{e}{i<value.length ? ',':''}</span> 
    })}]</span> 
  } 
  return <span> 
    <div className={'readmany-short'}> 
      {ifield.type} x {value ? (value as any[]).length : 0} <br/> 
      <div className={'readmany-long'}> 
        {value.map( (e, i) => { 
          return <div>{i}. {e}</div> 
        })} 
      </div> 
    </div> 
  </span> 
} 



// READ MIXED ====================================
export function ReadMixed({ifield, value={}}:IRead) { 
  return <span>{JSON.stringify(value)}</span> 
} 