import React, { useState } from 'react'; 
import {GetDefaultValueFromIField, OnEnter} from '../../reusable/_utils'; 


/*
  EditorContext
  // Editor (parentValue, setParentValue, ifield, at?, children?) 
  const valueAt = GetValueAt(parentValue, at); 
  const valueAt = SetValueAt(parentValue, at); 

  const [_value, _setValue]

  // synchronize from parent value
  useEffect(() => { 
    if(JSON.stringyfy(valueAt) !== JSON.stringyfy(_value)) 
      _setValue(valueAt); 
  }, [JSON.stringyfy(valueAt)]); 

  // synchronize to parent value 
  useUpdate(() => { 
    SetValueAt(parentValue, at); 
  },_value); 

  

*/

/*
interface IInput { 
  value:any; 
  setValue:React.Dispatch<any>; 
  ifield:IField; 
} 


export function Input({value, setValue, ifield}:IInput) { 
  const [_value, _setValue] = useState(value ?? GetDefaultValueFromIField(ifield)); 

  const SetValue = () => { 
    setValue((prev:any) => { 

    }); 
  }
  
  const OnEnterUp = (event:any) => { 
    OnEnter(event, SetValue); 
  } 
  

  
  return <div tabIndex={0} contentEditable='true' onBlur={}> 
    {_value} 
  </div> 
}*/