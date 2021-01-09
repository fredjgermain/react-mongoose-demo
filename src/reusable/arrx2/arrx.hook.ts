import {useContext} from 'react'; 
import {ElementContext} from './arrx.component'; 

export interface IArrx { 
  type:string; 
//  inputType?:string; 
  values:any[]; 
  //setValues:any; 
  defaultValue:any; 
} 

export interface IUseArrx extends IArrx { 
  //CreateElement:(newValue:any)=>void; 
  ReadElement:(at?:number)=>any; 
  //UpdateElement:(newValue:any, at:number)=>void; 
  //DeleteElement:(at:number)=>void; 
} 

export function useArrx(props:IArrx):IUseArrx { 
  const values = props.values ?? []; 
  //const {setValues, defaultValue} = props; 
  const {defaultValue} = props; 

  /*function GetIndex(at?:number) { 
    const {index} = useContext(ElementContext); 
    return at ?? index; 
  } */

  /*function Create(newValue:any) { 
    setValues([...values, newValue]); 
  } */

  function ReadElement(at?:number) { 
    const Index = useContext(ElementContext); 
    const index = at ?? -1; 
    return !(index >=0) ? defaultValue: (values[index] ?? defaultValue); 
  } 

  /*function Update(newValue:any, at:number) { 
    setValues((prev:any) => { 
      const newValues = [...prev]; 
      newValues[at] = newValue; 
      return newValues; 
    }); 
  } 

  function Delete(at:number) { 
    const newValues = [...values]; 
    newValues.splice(at, 1); 
    setValues(newValues); 
  } */
  return {...props, values, ReadElement}
  //return {...props, values, CreateElement: Create, ReadElement: Read, UpdateElement: Update, DeleteElement: Delete}; 
}