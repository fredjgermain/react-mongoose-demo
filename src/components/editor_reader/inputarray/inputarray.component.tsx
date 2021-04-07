import React, { useContext, useEffect, useState } from 'react'; 
import { Input } from '../input/_input'; 
import { useInputArray, IInputArray, IUseInputArray } from './inputarray.hook'; 

//interface IProps extends IInputArray, React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {} 
export const InputArrayContext = React.createContext({} as IUseInputArray); 
export function InputArray({...props}:IInputArray) { 
  const context = useInputArray(props); 

  return <InputArrayContext.Provider value={context} > 
    {context.values.map( (e,i) => { 
      return <div key={i} > 
        [{i}]: <UpdateElement index={i} /> <DeleteElement index={i}/> 
      </div> 
    })} 
    [+]: <CreateElement/> 
  </InputArrayContext.Provider> 
}

// Create element =======================================
function CreateElement() { 
  const { Create, ElementArgs } = useContext(InputArrayContext); 
  const elementArgs = ElementArgs(); 
  const [value, setValue] = useState(elementArgs.value); 
  elementArgs.value = value; 
  elementArgs.onSetValue = (newValue:any) => setValue(newValue); 
  elementArgs.onPressEnter = () => { 
    Create(value); 
    setValue(elementArgs.defaultValue); // reset input to defaultValue after creation. 
  }; 
  
  return <Input {...elementArgs}  /> 
} 

// Update element =======================================
function UpdateElement({index}:{index:number}) { 
  const { Update, ElementArgs } = useContext(InputArrayContext); 
  const elementArgs = ElementArgs(index); 
  const [value, setValue] = useState(elementArgs.value); 
  elementArgs.value = value; 
  elementArgs.onSetValue = (newValue:any) => setValue(newValue); 
  elementArgs.onPressEnter = () => Update(index, value); 
  
  useEffect(() => { 
    setValue(elementArgs.value); 
  }, [JSON.stringify(elementArgs.value)]); 

  return <Input {...elementArgs}  /> 
}

// Delete Btn ===================================
function DeleteElement({index}:{index:number}) {
  const {Delete} = useContext(InputArrayContext); 
  return <button onClick={() => Delete(index)} >x</button> 
}


