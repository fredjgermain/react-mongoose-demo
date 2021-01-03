import React, {useState, useContext} from 'react'; 
import {Input} from '../input/input.component'; 
import {IsPressEnter, IEvent} from '../../reusable/_input'; 
import {useInputArray, IInputArray, IUseInputArray} from './inputarray.hook'; 



function OnEnter(event:any, Func:any) { 
  if(IsPressEnter( (event as IEvent).code ) ) 
    Func(); 
} 

// InputArray ===================================
export const InputArrayContext = React.createContext({} as IUseInputArray); 
export const InputElementContext = React.createContext({} as {index:number}); 
export function InputArray({children, ...props}:React.PropsWithChildren<IInputArray>) { 
  const context = useInputArray(props); 
  return <InputArrayContext.Provider value={context}> 
    {children}
  </InputArrayContext.Provider> 
}

// Element =======================================
export function InputCreate({...props}:React.PropsWithChildren<React.HTMLAttributes<HTMLInputElement>>) { 
  const {type, defaultValue, Create} = useContext(InputArrayContext); 
  const [value, setValue] = useState(defaultValue); 

  const CreateOnEnter = (event:any) => OnEnter(event, () => {
    Create(value); 
    setValue(() => defaultValue); // reset input to defaultValue after creation. 
  }); 
  return <Input {...{type, value, setValue, ...props}} onKeyUp={CreateOnEnter} /> 
} 

export function InputElements({children}:React.PropsWithChildren<any>) { 
  const {values} = useContext(InputArrayContext); 
  return <div> 
    {values.map( (v:any, i:number) => { 
      return <InputElementContext.Provider key={i} value={{index:i}}> 
        {children} 
      </InputElementContext.Provider> 
    })} 
  </div>
}

export function InputElement({...props}:React.PropsWithChildren<React.HTMLAttributes<HTMLInputElement>>) { 
  const {type, values, Update} = useContext(InputArrayContext); 
  const {index} = useContext(InputElementContext); 
  const value = values[index]; 
  const setValue = (newValue:any) => Update(index, newValue); 
  return <Input {...{type, value, setValue, ...props}} /> 
} 

export function DeleteBtn({children, ...props}:React.PropsWithChildren<React.ButtonHTMLAttributes<HTMLButtonElement>>) { 
  const {Delete} = useContext(InputArrayContext); 
  const {index} = useContext(InputElementContext); 
  return <button onClick={() => Delete(index)} {...props}> 
    {!children ? 'x' : children} 
  </button> 
}