
export interface IInputSelect { 
  value:any; 
  placeholder?:string; 
  onSetValue: (newValues:any[]) => void; 
  options: IOption[]; 
  multiple?: boolean; 
  sizeFunc?: (value:any) => number; 
} 


// USE SELECT ====================================
export interface IUseSelect extends IInputSelect { 
  SelectValue:(newValue:any) => void; 
  GetSelection: () => IOption[]; 
  //Toggle:IUseToggle<HTMLDivElement>; 
} 