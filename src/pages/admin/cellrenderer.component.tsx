import {useState, useEffect, useContext} from 'react'; 
import {DaoContext} from '../../reusable/_dao'; 
import {TablrContext, CellContext} from '../../reusable/_tablr'; 
import {GetDefaultValueFromIField } from '../../reusable/_utils'; 
import {IRenderers, IFieldToHandler} from '../../reusable/_rendering'; 
import {useUpdate} from '../../reusable/_useupdate'; 



// Cell Renderer =================================
export function CellRenderer ({renderers}:{renderers:IRenderers}) { 
  const {activeEntry} = useContext(DaoContext); 
  const {datas} = useContext(TablrContext); 
  const {row, ifield} = useContext(CellContext); 
  const data = datas[row]; 
  const id = data ? data._id: ''; 

  const isEdit = activeEntry._id === id; 
  const value = isEdit ? activeEntry[ifield.accessor] : (data ? data[ifield.accessor] : GetDefaultValueFromIField(ifield)); 

  const handler = `${IFieldToHandler(ifield)}${isEdit?'Edit':'Read'}`; 
  const renderer = (renderers[handler] ?? renderers['Default'])(ifield); 
  return <ValueRenderer {...{value, ifield, renderer}} /> 
} 



// Value Renderer =================================
function ValueRenderer({...props}:{value:any, ifield:IField, renderer:(value: any, setValue: any) => JSX.Element}) { 
  const {setActiveEntry} = useContext(DaoContext); 
  const ifield = props.ifield; 
  const [value, setValue] = useState(props.value); 

  // synchronize hook with "parent value". 
  useEffect(() => { 
    if(props.value !== value) 
      setValue(props.value) 
  }, [props.value]); 

  // synchronize activeEntry with any changes made to value. 
  useUpdate(() => {
    setActiveEntry((prev:any) => { 
      const copy = {...prev}; 
      copy[ifield.accessor] = value; 
      return copy; 
    })
  }, value); 
  
  return <span>{props.renderer(value, setValue)}</span> 
}