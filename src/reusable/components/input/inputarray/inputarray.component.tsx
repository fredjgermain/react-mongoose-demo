import React, {useState, useContext} from 'react'; 
import {Input} from '../input/input.component'; 
import {OnEnter} from '../../../utils/_utils'; 
import {useInputArray, IInputArray, IUseInputArray} from './inputarray.hook'; 


// InputArray ===================================
export const InputArrayContext = React.createContext({} as IUseInputArray); 
export const InputElementContext = React.createContext({} as {index:number}); 
export function InputArray({children, ...props}:React.PropsWithChildren<IInputArray>) { 
  const context = useInputArray(props); 
  return <InputArrayContext.Provider value={context}> 
    {children}
  </InputArrayContext.Provider> 
}

// Create Element =======================================
export function CreateElement({...props}:React.PropsWithChildren<React.HTMLAttributes<HTMLInputElement>>) { 
  const {type, defaultValue, Create} = useContext(InputArrayContext); 
  const [value, setValue] = useState(defaultValue); 

  const CreateOnEnter = (event:any) => OnEnter(event, () => {
    Create(value); 
    setValue(() => defaultValue); // reset input to defaultValue after creation. 
  }); 
  return <Input {...{value, setValue, defaultValue, type, ...props}} onKeyUp={CreateOnEnter} /> 
} 

// Element Count =======================================
export function ElementCount() {
  const {type, values} = useContext(InputArrayContext); 
  return <span>{values.length} of type {type}</span>; 
}


// Elements =======================================
export function Elements({children}:React.PropsWithChildren<any>) { 
  const {values} = useContext(InputArrayContext); 
  return <div> 
    {values.map( (v:any, i:number) => { 
      return <InputElementContext.Provider key={i} value={{index:i}}> 
        {children} 
      </InputElementContext.Provider> 
    })} 
  </div>
}

// Element =========================================
export function Element({...props}:React.PropsWithChildren<React.HTMLAttributes<HTMLInputElement>>) { 
  const {type, values, defaultValue, Update} = useContext(InputArrayContext); 
  const {index} = useContext(InputElementContext); 
  const value = values[index]; 
  const setValue = (newValue:any) => Update(index, newValue); 
  return <Input {...{type, value, setValue, defaultValue, ...props}} /> 
} 

// Delete Btn ===================================
export function DeleteBtn({children, ...props}:React.PropsWithChildren<React.ButtonHTMLAttributes<HTMLButtonElement>>) { 
  const {Delete} = useContext(InputArrayContext); 
  const {index} = useContext(InputElementContext); 
  return <button onClick={() => Delete(index)} {...props}> 
    {!children ? 'x' : children} 
  </button> 
}