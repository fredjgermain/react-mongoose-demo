export interface IInputArray {
  values:any[]; 
  returnValues:any; 
  defaultValue:any; 
  type:string; 
}

export interface IUseInputArray { 
  values:any[]; 
  returnValues:any; 
  defaultValue:any; 
  type:string; 

  Create:(newValue:any)=>void;
  Update:(at:number, newValue:any)=>void;
  Delete:(at:number, )=>void;
}

export function useInputArray(props:IInputArray):IUseInputArray { 
  const values = props.values ?? []; 
  const {returnValues, type, defaultValue} = props; 

  function Create(newValue:any) { 
    const newValues = [...values, newValue]; 
    returnValues(newValues); 
  } 

  function Update(at:number, newValue:any) { 
    const newValues = [...values]; 
    newValues[at] = newValue; 
    returnValues(newValues); 
  } 

  function Delete(at:number) { 
    const newValues = [...values]; 
    newValues.splice(at, 1); 
    returnValues(newValues); 
  } 
  return {values, returnValues, defaultValue, type, Create, Update, Delete};
}