import React from 'react'; 
import {GetDefaultValueFromIField, ToArray, IsEmpty} from '../../reusable/_utils'; 

import {IReader} from './reader.component';



export interface IEditor extends IReader { 
  setValue: React.Dispatch<any>; 
} 

interface IEditorComponent extends IEditor { 
  renderFunc?: ({...props}:IEditor) => JSX.Element; 
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