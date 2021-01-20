
export interface IInputArray { 
  type:string; 
  inputType?:string; 
  values:any[]; 
  setValues:any; 
  defaultValue:any; 
} 

export interface IUseInputArray extends IInputArray { 
  Create:(newValue:any)=>void; 
  Update:(at:number, newValue:any)=>void; 
  Delete:(at:number)=>void; 
} 

export function useInputArray(props:IInputArray):IUseInputArray { 
  const {values, setValues} = props; 

  function Create(newValue:any) { 
    setValues((prev:any[]) => [...prev, newValue]); 
  } 

  function Update(at:number, newValue:any) { 
    setValues((prev:any) => { 
      const newValues = [...prev]; 
      newValues[at] = newValue; 
      return newValues; 
    }); 
  } 

  function Delete(at:number) { 
    setValues((prev:any) => { 
      const newValues = [...prev]; 
      newValues.splice(at, 1); 
      return newValues; 
    }); 
  } 
  return {...props, values, Create, Update, Delete}; 
}