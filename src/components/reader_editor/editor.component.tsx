import {useEffect, useState} from 'react'; 
import {IEditor, IEditorFunc, GetReadValue, GetDefaultEditorFunc} from './editor_reader.utils'; 


interface IProps extends IEditor{ 
  func: IEditorFunc; 
}

export default function Editor({ifield, options=[], ...props}:IProps) { 
  const [value, setValue] = useState(GetReadValue(props.value, options, ifield)); 
  props.func = props.func ?? GetDefaultEditorFunc(ifield); 
  const editValue = (newValue:any) => setValue(newValue); 

  useEffect(() => { 
    if(value !== props.value) 
      props.editValue(value); 
  }, [value]); 

  return <props.func {...{value, editValue, options, ifield}} /> 
} 

