import { useState } from 'react'; 
import './input.css'; 


interface IType { 
  type:string; 
} 

export function Input() { 
  return <span className={'test-input'} tabIndex={0} contentEditable> 
    { '-- value --' } 
  </span> 
} 