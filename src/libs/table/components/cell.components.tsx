import { useContext } from 'react'; 
import { InlineEntryContext } from './inlineentry.components'; 
import { Reader, Editor } from '../../editor_reader/_editor_reader';


type IGetCellArgs = () => { 
  value: any; 
  editValue: (newValue: any) => void; 
  ifield: IField; 
  options: IOption[]; 
} 

export function Cell({...props}:{GetCellArgs:IGetCellArgs}) { 
  const {value, ifield, options} = props.GetCellArgs(); 
  return <Reader {...{value, ifield, options}} /> 
} 


export function InlineCell({...props}:{GetCellArgs:IGetCellArgs}) { 
  const {value, editValue, ifield, options} = props.GetCellArgs(); 
  const {isEditing, isSelected} = useContext(InlineEntryContext); 

  return <span>
    {isEditing && isSelected ? 
      <Editor {...{value, editValue, ifield, options}} />: 
      <Reader {...{value, ifield, options}} /> 
    } 
  </span> 
} 