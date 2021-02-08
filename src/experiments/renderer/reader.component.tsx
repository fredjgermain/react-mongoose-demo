import React from 'react'; 
import {GetDefaultValueFromIField, ToArray, Pick, IsEmpty} from '../../reusable/_utils'; 


export interface IReader {   
  ifield: IField; 
  value: any; 
  options?: IOption[]; 
} 

interface IReaderComponent extends IReader { 
  renderFunc?: ({...props}:IReader) => JSX.Element; 
}

// READER =================================================
export function Reader({ifield, options=[], ...props}:IReaderComponent) { 
  const value = IsEmpty(options) ? 
    props.value ?? GetDefaultValueFromIField(ifield): 
    GetSelection(props.value).map(o => o.label); 

  function GetSelection (value:any) { 
    return Pick(options, ToArray(props.value), (o,u) => o.value === u); 
  } 
  
  // Read one
  // Read many
  // Read mixed
  if(ifield.isArray) 
    return <ReadMany {...{ifield, value}} /> 
  if(ifield.isMixed) 
    return <ReadMixed {...{ifield, value}} /> 
  return <ReadOne {...{ifield, value}} /> 
} 


// Read one .......................................
function ReadOne({ifield, value=GetDefaultValueFromIField(ifield)}:IReader) { 
  if(ifield.type === 'boolean') 
    return <span>{JSON.stringify(value)}</span> 
  return <span>{value}</span> 
} 


// Read many ........................................
function ReadMany({ifield, value=[]}:IReader) { 
  const isShort = JSON.stringify(value).length < 15; 

  if(!Array.isArray(value)) 
    return <span>{JSON.stringify(value)}</span> 

  if(isShort) { 
    return <span>[{value.map( (e, i) => { 
        return <span key={i}>{i!==0 && ', '}{e}</span> 
    })}]</span> 
  } 
  return <span> 
    <div className={'readmany-short'}> 
      {ifield.type} x {value ? (value as any[]).length : 0} <br/> 
      <div className={'readmany-long'}> 
        {value.map( (e, i) => { 
          return <div key={i}>{i}. {e}</div> 
        })} 
      </div> 
    </div> 
  </span> 
} 

// Read mixed ..............................................
function ReadMixed({ifield, value={}}:IReader) { 
  return <span>{JSON.stringify(value)}</span> 
} 