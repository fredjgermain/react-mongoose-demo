
export interface IInputSelect { 
  value:any; 
  placeholder?:string; 
  onSetValue: (newValues:any[]) => void; 
  options: IOption[]; 
  multiple?: boolean; 
  sizeFunc?: (value:any) => number; 
} 

export interface IUseSelect extends IInputSelect { 
  toggle: boolean; 
  SetToggle: (toggle?:boolean) => void; 
  SelectValue:(newValue:any) => void; 
  GetSelection: () => IOption[]; 
} 