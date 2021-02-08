import { useState } from 'react';
import {Reader, Editor} from './renderer.component';

export function TestRenderer() { 
  const [value, setValue] = useState([12, 15, 96, 66, 788]); 
  const options = [] as IOption[]; 
  const ifield = {accessor:'', label:'', defaultValue:0, type:'number', isArray:true} as IField; 
  

  return <div> 
    <Reader {...{value, ifield}} /> 
    <Editor {...{value, setValue, ifield}} /> 
  </div> 
} 
