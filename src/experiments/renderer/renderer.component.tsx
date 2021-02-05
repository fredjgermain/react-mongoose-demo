import React from 'react'; 



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
- Many options      (select, radio) 
- Mixed?
*/

interface IReader { 
  value: any; 
  options?: IOption[]; 
  ifield: IField; 
} 

interface IEditor { 
  value: any; 
  setValue: React.Dispatch<any>; 
  options?: IOption[]; 
  ifield: IField; 
} 

interface IRenderer extends IReader, IEditor{ 
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
}

export function Reader({value, options, ifield}:IReader) {

  return <div>
    Reader ... 
    </div>
}

export function Editor({value, setValue, options, ifield}:IEditor) { 
  return <div> 
    Editor ... 
  </div> 
} 