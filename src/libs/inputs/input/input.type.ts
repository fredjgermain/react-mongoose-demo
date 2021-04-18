export interface IInput{ 
  type: string; 
  value: any; 
  defaultValue?: any; 

  placeholder?: string; 

  onSetValue: (newValue:any) => void; 
  onPressEnter?: () => void; 

  sizeFunc?: (value:any) => number; 
  inputAttribute?: React.InputHTMLAttributes<HTMLInputElement>; 
}