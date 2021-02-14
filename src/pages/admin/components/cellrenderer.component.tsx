import {useContext} from 'react'; 
import {CrudContext} from '../../../reusable/_crud'; 
import {TablrContext, CellContext} from '../../../reusable/_tablr'; 
import {GetDefaultValueFromIField} from '../../../reusable/_utils'; 
import {Reader, Editor} from '../../../reusable/_input'; 
import { EActionType } from '../../../reusable/_dao';


// Cell Renderer =================================
export function CellRender() { 
  const {activeEntry, activeMode, setActiveEntry, GetIOptions} = useContext(CrudContext); 
  const {datas} = useContext(TablrContext); 
  const {row, ifield} = useContext(CellContext); 
  const data = datas[row]; 
  const id = data ? data?._id: ''; 

  const isEdit = activeEntry?._id === id && (activeMode === EActionType.CREATE || activeMode === EActionType.UPDATE); 
  const defaultValue = GetDefaultValueFromIField(ifield); 

  // value and setValue ---------------
  const value = isEdit ? 
    ( activeEntry[ifield.accessor] ?? defaultValue ): 
    ( data ? data[ifield.accessor] : defaultValue ); 

  const setValue = (newValue:any) => { 
    const copy = {...activeEntry}; 
    copy[ifield.accessor] = newValue; 
    setActiveEntry(copy); 
  } 

  if(ifield.validators) 
    ifield.validators.every( valid => { 
      console.log(valid(value)); 
      return valid(value); 
    }); 

  // options if foreign -------------------------
  const options = ifield.isModel ? GetIOptions(ifield) : undefined; 
  /*if(ifield.isModel)
    console.log([ifield.accessor, options]); */

  if(isEdit) 
    return <span>{ifield.isRequired && '!!!'}<Editor {...{value, ifield, setValue, options}} /></span> 
  return <span>{ifield.isRequired && '!!!'}<Reader {...{value, ifield, options}} /></span> 
} 


