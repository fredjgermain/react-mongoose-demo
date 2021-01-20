import {useState, useEffect, useContext} from 'react'; 
import {DaoContext} from '../../reusable/_dao'; 
import {TablrContext, CellContext} from '../../reusable/_tablr'; 
import {GetDefaultValueFromIField } from '../../reusable/_utils'; 
import {IRenderers, IFieldToHandler} from '../../reusable/_rendering'; 


export function CellRenderer ({renderers}:{renderers:IRenderers}) { 
  const {activeEntry, setActiveEntry, activeMode, GetEntry} = useContext(DaoContext); 
  const {datas} = useContext(TablrContext); 
  const {row, ifield} = useContext(CellContext); 
  const data = datas[row]; 
  const id = data ? data._id: ''; 

  const isEdit = activeEntry._id === id; 
  const _value = isEdit ? activeEntry[ifield.accessor] : (data ? data[ifield.accessor] : GetDefaultValueFromIField(ifield)); 

  //activeEntry 
  const [value, setValue] = useState(_value); 

  useEffect(() => { 
    setActiveEntry((prev:any) => {
      const copy = {...prev}; 
      copy[ifield.accessor] = value; 
      return copy; 
    }); 
  }, [value]); 

  //const isMode = activeMode === mode; 
  const handler = `${IFieldToHandler(ifield)}${isEdit?'Edit':'Read'}`; 
  const renderer = renderers[handler] ?? renderers['Default']; 

  return <span>{renderer(ifield)(value, setValue)}</span> 
}