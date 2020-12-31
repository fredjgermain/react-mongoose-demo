import React from 'react'; 

interface IShow { 
  value:any; 
  type?:string; 
  long?:boolean; 
}
export default function Show({value, type = typeof value, long = false}:IShow) { 
  if(Array.isArray(value)) 
    return <ShowArray {...{value, type, long}} /> 
  if(type === 'string' || type === 'number') 
    return <span>{value}</span> 
  if(type === 'boolean') 
    return <span>{JSON.stringify(value)}</span> 
  return <span>{JSON.stringify(value)}</span> 
}

function ShowArray({long = false, ...props}:IShow) {
  const values = props.value ?? []; 
  const type = props.type ?? 'any'; 
  
  const isLong = <div>
    [{values.map( (v:any, i:number) => { 
      return i < values.length-1 ? 
        <span key={i}> {v}, </span>: 
        <span key={i}> {v} </span>; 
    })}] 
  </div>

  return <span> {props.type} x {values.length} 
    {long && isLong} 
  </span> 
}