export interface IArrx { 
  type:string; 
//  inputType?:string; 
  values:any[]; 
  setValues:any; 
  defaultValue:any; 
} 

export interface IUseArrx extends IArrx { 
  Create:(newValue:any)=>void; 
  Read:(at?:number)=>any; 
  Update:(newValue:any, at:number)=>void; 
  Delete:(at:number)=>void; 
} 

export function useArrx(props:IArrx):IUseArrx { 
  const values = props.values ?? []; 
  const {setValues, defaultValue} = props; 

  /*function GetIndex(at?:number) { 
    const {index} = useContext(ElementContext); 
    return at ?? index; 
  } */

  function Create(newValue:any) { 
    setValues((prev:any) => [...prev, newValue]); 
  } 

  function Read(at?:number) { 
    const index = at ?? -1; 
    return !(index >=0) ? defaultValue: (values[index] ?? defaultValue); 
  } 

  function Update(newValue:any, at:number) { 
    //const index = GetIndex(at); 
    const index = at;
    setValues((prev:any) => { 
      const newValues = [...prev]; 
      newValues[index] = newValue; 
      return newValues; 
    }); 
  } 

  function Delete(at:number) { 
    //const index = GetIndex(at); 
    const index = at;
    setValues((prev:any) => { 
      const newValues = [...prev]; 
      newValues.splice(index, 1); 
      return newValues; 
    }); 
  } 
  return {...props, values, Create, Read, Update, Delete}; 
}