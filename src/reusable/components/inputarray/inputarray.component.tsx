import React, { useContext, useEffect, useState } from 'react'; 
import {Arrx, ArrxContext, Elements, Element, ElementContext, ElementIndex, ElementValue} from '../../../reusable/_arrx'; 
import {Input} from '../input/input.component'; 
import {IInputArray, IUseInputArray, useInputArray} from './inputarray.hook'; 


export const InputArrayContext = React.createContext({} as IUseInputArray); 
export function InputArray({...props}:React.PropsWithChildren<IInputArray>) { 
  const context = useInputArray(props); 
  const {values} = props; 
  
  return <InputArrayContext.Provider value={context} > 
    <Arrx {...{values}} > 
      <Elements> 
        <UpdateElement/> <DeleteBtn/>
        <br/> 
      </Elements> 
      <CreateElement/>
    </Arrx> 
  </InputArrayContext.Provider> 
} 


// Create element =======================================
function CreateElement() { 
  const {ifield, Create} = useContext(InputArrayContext); 
  const {defaultValue} = ifield; 
  const [value, setValue] = useState(defaultValue); 

  const onPressEnter = () => { 
    Create(value); 
    setValue(defaultValue); // reset input to defaultValue after creation. 
  }; 
  return <Input {...{value, setValue, ifield, onPressEnter}}  /> 
} 

// Update element =======================================
function UpdateElement() { 
  const {values, ifield, Update} = useContext(InputArrayContext); 
  const {index} = useContext(ElementContext); 
  const [value, setValue] = useState(values[index]); 
  
  useEffect(() => { 
    setValue(values[index]); 
  }, [JSON.stringify(values[index])]); 

  const onPressEnter = () => Update(index, value); 
  return <Input {...{value, setValue, ifield, onPressEnter}}  /> 
}

// Delete Btn ===================================
export function DeleteBtn({children, ...props}:React.PropsWithChildren<React.ButtonHTMLAttributes<HTMLButtonElement>>) { 
  const {Delete} = useContext(InputArrayContext); 
  const {index} = useContext(ElementContext); 
  return <button onClick={() => Delete(index)} {...props}> 
    {!children ? 'x' : children} 
  </button> 
}

