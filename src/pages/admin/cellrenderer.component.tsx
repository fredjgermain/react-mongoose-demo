import {useState, useEffect, useContext, useRef} from 'react'; 
import {DaoContext} from '../../reusable/_dao'; 
import {TablrContext, CellContext} from '../../reusable/_tablr'; 
import {GetDefaultValueFromIField } from '../../reusable/_utils'; 
import {IRenderers, IFieldToHandler} from '../../reusable/_rendering'; 
import {useUpdate} from '../../reusable/_useupdate';


export function CellRenderer ({renderers}:{renderers:IRenderers}) { 
  const {activeEntry, setActiveEntry, activeMode, GetEntry} = useContext(DaoContext); 
  const {datas} = useContext(TablrContext); 
  const {row, ifield} = useContext(CellContext); 
  const data = datas[row]; 
  const id = data ? data._id: ''; 

  const isEdit = activeEntry._id === id; 
  const value = isEdit ? activeEntry[ifield.accessor] : (data ? data[ifield.accessor] : GetDefaultValueFromIField(ifield)); 

  const handler = `${IFieldToHandler(ifield)}${isEdit?'Edit':'Read'}`; 
  const renderer = (renderers[handler] ?? renderers['Default'])(ifield); 
  //const isMode = activeMode === mode; 
  return <ValueRenderer {...{value, renderer}} /> 
}


function ValueRenderer({...props}:{value:any, renderer:(value: any, setValue: any) => JSX.Element}) { 
  const {setActiveEntry} = useContext(DaoContext); 
  const {row, ifield} = useContext(CellContext); 
  const [value, setValue] = useState(props.value); 

  useUpdate(() => {
    setActiveEntry((prev:any) => { 
      const copy = {...prev}; 
      copy[ifield.accessor] = value; 
      return copy; 
    })
  }, value); 
  
  return <span>{props.renderer(value, setValue)}</span> 
}