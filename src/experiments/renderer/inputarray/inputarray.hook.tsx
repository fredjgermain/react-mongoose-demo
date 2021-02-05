
export interface IInputArray { 
  values:any[]; 
  setValues:React.Dispatch<any[]>; 
  ifield:IField; 

  inputType?:string; 
  width?: (value:any) => number; 
  validator?: (value:any) => boolean; 
  placeholder?: any; 
  onPressEnter?: () => void; 
} 

export interface IUseInputArray extends IInputArray { 
  Create:(newValue:any)=>void; 
  Update:(at:number, newValue:any)=>void; 
  Delete:(at:number)=>void; 
} 

export function useInputArray(props:IInputArray):IUseInputArray { 
  const {values, setValues} = props; 

  function Create(newValue:any) { 
    setValues([...values, newValue]); 
  } 

  function Update(at:number, newValue:any) { 
    const newValues = [...values]; 
    newValues[at] = newValue; 
    setValues(newValues); 
  } 

  function Delete(at:number) { 
    const newValues = [...values]; 
    newValues.splice(at, 1); 
    setValues(newValues); 
  } 
  return {...props, values, Create, Update, Delete}; 
}