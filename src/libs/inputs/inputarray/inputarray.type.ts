import { IInput } from '../input/_input'; 

export interface IInputArray { 
  type: string; 
  values: any[]; 
  defaultValue?: any; 

  placeholder?: string; 

  onSetValues: (newValues:any) => void; 

  sizeFunc?: (value:any) => number; 
  inputAttribute?: React.InputHTMLAttributes<HTMLInputElement>; 
} 


export interface IUseInputArray extends IInputArray { 
  ElementArgs:(at?:number) => IInput; 
  Create:(newValue:any) => void; 
  Update:(at:number, newValue:any) => void; 
  Delete:(at:number) => void; 
} 