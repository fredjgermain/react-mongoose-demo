import {useState} from 'react'; 


export interface IInputArray {
  type:string; 
  values:any[]; 
  setValues:any; 
  defaultValue:any; 
} 

export interface IUseInputArray { 
  type:string; 
  values:any[]; 
  setValues:any[]; 
  defaultValue:any; 

  Create:(newValue:any)=>void; 
  Update:(at:number, newValue:any)=>void; 
  Delete:(at:number)=>void; 
} 

export function useInputArray(props:IInputArray):IUseInputArray { 
  const values = props.values ?? []; 
  const {setValues, type, defaultValue} = props; 
  //const [value, setValue] = useState(defaultValue); 

  function Create(newValue:any) { 
    setValues((prev:any) => [...prev, newValue]); 
  } 

  function Update(at:number, newValue:any) { 
    //console.log(newValue); 
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
  return {type, values, setValues, defaultValue, Create, Update, Delete};
}