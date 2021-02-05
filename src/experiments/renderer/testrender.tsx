import { useState } from 'react';
import {Renderer, Reader, Editor} from './renderer.component';


export function TestRenderer() { 
  const [value, setValue] = useState(12); 
  const options = [] as IOption[]; 
  const ifield = {accessor:'', label:'', defaultValue:0, type:'number'} as IField; 

  return <Renderer {...{value, setValue, options, ifield, editor:Editor, reader:Reader}} />
}