// useInputArray ==========================================
export interface IInputArray { 
  values:any[]; 
  setValues:React.Dispatch<React.SetStateAction<any[]>> 
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


// useInputArray ==========================================
export function useInputArray({...props}:IInputArray):IUseInputArray { 
  const {values, setValues} = props; 

  function Create(newValue:any) { 
    setValues((prev:any[]) => [...prev, newValue]); 
  } 

  function Update(at:number, newValue:any) { 
    setValues((prev:any[]) => {
      const copy = [...prev]; 
      copy[at] = newValue; 
      return copy; 
    })
  } 

  function Delete(at:number) { 
    setValues((prev:any[]) => { 
      const copy = [...prev]; 
      copy.splice(at, 1); 
      return copy; 
    }); 
  } 
  return {...props, Create, Update, Delete}; 
}