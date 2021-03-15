import {IEditor, IEditorFunc, GetDefaultEditorFunc} from './editor_reader.utils'; 


interface IProps extends IEditor{ 
  func: IEditorFunc; 
}

export default function Editor({...props}:IProps) { 
  props.func = props.func ?? GetDefaultEditorFunc(props.ifield); 
  return <props.func {...props} /> 
} 

