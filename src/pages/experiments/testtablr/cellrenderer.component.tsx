import { useContext } from 'react'; 
import {CellContext} from '../../../reusable/components/tablr/_tablr'; 

import {GetRenderingFunc, IFieldToHandler, IRenderers} from './rendering/renderers.utils'; 
import {ActiveContext} from './testtablr'; 


export function CellRenderer({renderers}:{renderers:IRenderers}) { 
  const {value:_value, row} = useContext(CellContext); 
  const {active, SetData} = useContext(ActiveContext); 
  const {ifield} = useContext(CellContext); 

  const isActive = active.row === row; 
  const isEdit = (active.mode === 'create' || active.mode === 'update') && isActive; 

  const value = isActive ? active.data[ifield.accessor]: _value; 
  const setValue = (newValue:any) => { 
    const newData = {...active.data}; 
    newData[ifield.accessor] = newValue; 
    SetData(newData); 
  }; 

  const handler = `${IFieldToHandler(ifield)}${isEdit?'Edit':'Read'}`; 
  const renderer = GetRenderingFunc(renderers, handler)(ifield); 

  // Cell Context -------------------------------
  return <span>{renderer(value, setValue)}</span>
}