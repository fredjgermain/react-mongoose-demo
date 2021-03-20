import React, { useContext, useEffect, useState } from 'react'; 
import { IsNull } from '../../../reusable/_utils';
import { Input } from '../input/_input'; 


export interface IInputArray { 
  _type: string; 
  _values:any[]; 
  _defaultValue: any; 
  _onChange: (newValues:any[]) => void; 
  _onPressEnter?: () => void; 
  _width?: (value:any) => number; 
} 


export interface IUseInputArray extends IInputArray { 
  Create:(newValue:any) => void; 
  Update:(at:number, newValue:any) => void; 
  Delete:(at:number) => void; 
} 

// USE INPUT ARRAY ========================================
function useInputArray({...props}:IInputArray):IUseInputArray { 
  props._values = IsNull(props._values) ? []: props._values; 

  // Creates new elements
  function Create (newValue:any) { 
    props._onChange([...props._values, newValue]); 
  }; 
  // Update existing new elements
  function Update (at:number, newValue:any) { 
    const copy = [...props._values]; 
    copy[at] = newValue; 
    props._onChange(copy); 
  }; 
  // Delete existing elements 
  function Delete (at:number) { 
    const copy = [...props._values]; 
    copy.splice(at,1); 
    props._onChange(copy); 
  }; 
  return {...props, Create, Update, Delete}; 
}


//interface IProps extends IInputArray, React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {} 
export const InputArrayContext = React.createContext({} as IUseInputArray); 
export function InputArray({...props}:IInputArray) { 
  const context = useInputArray(props); 

  return <InputArrayContext.Provider value={context} > 
    {context._values.map( (e,i) => { 
      return <div key={i} > 
        [{i}]: <UpdateElement index={i} /> <DeleteElement index={i}/> 
      </div> 
    })}
    [+]: <CreateElement/> 
  </InputArrayContext.Provider> 
}



// Create element =======================================
function CreateElement() { 
  const {_type, _defaultValue, _width, Create} = useContext(InputArrayContext); 
  const [_value, setValue] = useState(_defaultValue); 

  const _onPressEnter = () => { 
    Create(_value); 
    setValue(_defaultValue); // reset input to defaultValue after creation. 
  }; 
  const _onChange = (newValue:any) => setValue(newValue); 

  return <Input {...{_type, _value, _defaultValue, _onChange, _onPressEnter, _width}}  /> 
} 

// Update element =======================================
function UpdateElement({index}:{index:number}) { 
  const {_values, _type, _defaultValue, _width, Update} = useContext(InputArrayContext); 
  const [_value, setValue] = useState(_values[index]); 

  useEffect(() => { 
    setValue(_values[index]); 
  }, [JSON.stringify(_values[index])]); 

  const _onPressEnter = () => Update(index, _value); 
  const _onChange = (newValue:any) => setValue(newValue); 
  
  return <Input {...{_type, _value, _defaultValue, _onChange, _onPressEnter, _width}}  /> 
}

// Delete Btn ===================================
function DeleteElement({index}:{index:number}) {
  const {Delete} = useContext(InputArrayContext); 
  return <button onClick={() => Delete(index)} >x</button> 
}


