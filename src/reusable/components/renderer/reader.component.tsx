import React from 'react'; 
import {ToArray, Pick}  from '../../_arrayutils'; 
import {GetDefaultValueFromIField, IsEmpty} from '../../_utils'; 


export interface IReader { 
  ifield: IField; 
  value: any; 
  options?: IOption[]; 
} 

type ReaderFunc = ({...props}:IReader) => JSX.Element; 

export interface IReaderComponent extends IReader { 
  CustomReadDefault?:ReaderFunc; 
  CustomReadOne?:ReaderFunc; 
  CustomReadMany?:ReaderFunc; 
  CustomReadMixed?:ReaderFunc; 
} 

/* READER =================================================
- ifield      // gives info about the type and default values to be displayed. 
- value       // will be assigned to its appropriate default values if undefined. 
- options     // if not empty, the label matching the value will be displayed. 

- CustomReadDefault 
    * if defined this function will be used display value. 

- CustomReadMany 
    * if defined and the value is an Array, then this function will be used to display value. 
    otherwise it will use the default 'ReadMany' component. 

- CustomReadMixed 
    * if defined and the value is mixed, then this function will be used to display value. 
    otherwise it will use the default 'ReadMixed' component. 

- CustomReadOne
    * if defined and the value is single primitive data, then this function will be used to display value. 
    otherwise it will use the default 'ReadOne' component. 
*/
export function Reader({ifield, options=[], ...props}:IReaderComponent) { 
  const value = IsEmpty(options) ? 
    props.value ?? GetDefaultValueFromIField(ifield): 
    GetSelection(props.value).map(o => o.label); 

  function GetSelection (value:any) { 
    return Pick(options, ToArray(props.value), (o,u) => o.value === u); 
  } 

  const args = {ifield, value}; 

  // Read Default
  let readfunc = props.CustomReadDefault ?? undefined; 
  // Read Many
  if(!readfunc && ifield.isArray) 
    readfunc = props.CustomReadMany ?? ReadMany; 
  // Read Mixed
  if(!readfunc && ifield.isMixed) 
    readfunc = props.CustomReadMixed ?? ReadMixed; 
  // Read One
  readfunc = readfunc ?? props.CustomReadOne ?? ReadOne; 
  return <ReadFunc {...{readfunc, args}} /> 
} 

function ReadFunc({...props}:{readfunc:ReaderFunc, args:IReader}) { 
  return <props.readfunc {...props.args} />; 
} 



// Default Read one .......................................
function ReadOne({ifield, value=GetDefaultValueFromIField(ifield)}:IReader) { 
  if(ifield.type === 'boolean') 
    return <span>{JSON.stringify(value)}</span> 
  return <span>{value}</span> 
} 


// Default Read many ........................................
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

// Default Read mixed ..............................................
function ReadMixed({ifield, value}:IReader) { 
  return <span>{JSON.stringify(value)}</span> 
} 