import React from 'react'; 
import {Input} from './input/input.component'; 
import {InputArray} from './inputarray/inputarray.component'; 
import {GetDefaultValueFromIField, ToArray, IsEmpty} from '../../reusable/_utils'; 

/* 
Can a context be passed as an argument ?? 
Can a component be passed as an argument ?? 
  could a 'Cell' component receive a 'Renderer' component as argument. 
  Then Cell passes value, setValue, options etc. to renderer? 

Can Renderer receive 
*/ 


/* 
Renderer takes in value, setValue, options and a set of n RenderComponents. 

Reader
- Single primitive value  (ReadOne) 
- Many primitive value    (ReadyMany) 
- Mixed?                  (ReadMixed?) 

Editor
- Single primitive  (input) 
- Many primitive    (Input array) 
- Single options    (select, radio) 
- Many options      (select, checkbox set?) 
- Mixed?
*/

interface IReader {   
  ifield: IField; 
  value: any; 
  options?: IOption[]; 
} 

interface IReaderComponent extends IReader { 
  renderFunc?: ({...props}:IReader) => JSX.Element; 
}

interface IEditor extends IReader { 
  setValue: React.Dispatch<any>; 
} 

interface IEditorComponent extends IEditor { 
  renderFunc?: ({...props}:IEditor) => JSX.Element; 
} 


/*interface IRenderer extends IReader, IEditor{ 
  reader: ({...props}:IReader) => JSX.Element; 
  editor: ({...props}:IEditor) => JSX.Element; 
} 

export function Renderer({value, setValue, options, ifield, reader, editor}:IRenderer) { 
  console.log(value, setValue, options, ifield); 
  return <div> 
    <Reader {...{value, options, ifield}} /> 
    <br/>
    <Editor {...{value, setValue, options, ifield}} /> 
  </div> 
}*/


// READER =================================================
export function Reader({ifield, options=[], ...props}:IReaderComponent) { 
  const value = IsEmpty(options) ? 
    props.value ?? GetDefaultValueFromIField(ifield): 
    GetSelection(props.value).map(o => o.label); 

  function GetSelection (value:any) { 
    return options; 
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




export function Editor({
    ifield, 
    value=GetDefaultValueFromIField(ifield), 
    options=[], 
    setValue}:IEditorComponent) { 

  return <div> 
    Editor ... 
  </div> 
} 