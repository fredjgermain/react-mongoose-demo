import React from 'react'; 
import InputData from '../inputdata/inputdata.component'; 
import {useInputArray, IInputArray, IUseInputArray} from './inputarray.hook'; 

// InputArray ===================================
export const InputArrayContext = React.createContext({} as IUseInputArray); 
export default function InputArray({children, ...props}:React.PropsWithChildren<IInputArray>) { 
  const context = useInputArray(props); 
  const {values, type, defaultValue, Create, Update, Delete} = context; 

  // default return if children is not defined
  if(!children) 
    return <InputArrayContext.Provider value={context}> 
      {values.map( (v:any, i:number) => { 
        return <div key={i}> 
          <InputData type={type} value={v} returnValue={(value) => Update(i, value)} /> 
          <button onClick={() => Delete(i)}>x</button> 
        </div> 
      })} 
      <InputData type={type} value={defaultValue} returnValue={Create} onBlur={()=>{}} /> 
    </InputArrayContext.Provider> 

  // alternate return if children is defined
  return <InputArrayContext.Provider value={context}> 
    {children} 
  </InputArrayContext.Provider> 
}

/*
function Elements({children, ...props}:React.PropsWithChildren<IInput>) { 
  const context = useContext(InputArrayContext); 

  return <div> 
    
  </div>
}
*/

