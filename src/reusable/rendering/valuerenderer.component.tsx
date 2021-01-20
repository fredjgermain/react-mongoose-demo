import { useEffect, useMemo, useState } from 'react'; 
import {IFieldToHandler, IRenderers} from './renderers.utils'; 



// DATA RENDERER ================================
interface IValueRenderer { 
  value:any; 
  data:any; 
  setData:any; 
  isEdit:boolean; 
  ifield:IField; 
  renderers:IRenderers; 
} 
export function ValueRenderer({...props}:IValueRenderer) { 
  const {data, setData, ifield, isEdit, renderers} = props; 
  const [value, setValue] = useState(props.value); 

  //console.log([props.data, value]); 

  // update value if data changes 
  useEffect(() => { 
    setValue(props.value); 
  }, [JSON.stringify(props.value)]) 

  // update data when value is changed 
  const hasChanged = JSON.stringify(props.value) !== JSON.stringify(value) 
  /*if(hasChanged) 
    console.log([ifield.accessor, value, props.value]); */ 

  useEffect(() => { 
    if(!isEdit) 
      return; 
    const newData = {...data}; 
    newData[ifield.accessor] = value; 
    /*if(ifield.accessor === 'titles') 
      console.log(newData); */ 
    //setData(newData); 
  }, [JSON.stringify(value)]); 

  const handler = `${IFieldToHandler(ifield)}${isEdit?'Edit':'Read'}`; 
  const renderer = renderers[handler] ?? renderers['Default']; 

  
  return <span>{renderer(ifield)(value, setValue)}</span> 
  //return <span>Dada</span>
}