import React, { useContext } from 'react'; 
import { Editor } from '../../../libs/editor_reader/_editor_reader'; 
import { DaoContext } from '../../../libs/_dao'; 
import { AdminContext } from '../hooks/admin.hook'; 


export function ColumnsSelector() { 
  const dao = useContext(DaoContext); 
  const {collection, cols:value, SetCols:editValue} = useContext(AdminContext); 
  const defaultColumns = dao.GetIFields(collection).filter(f=>f.label); 
  const ifield:IField = {accessor:'', label:'', defaultValue:'', type:'string', isArray:true}; 
  
  const options:IOption[] = defaultColumns.map(c=> { 
    return {value:c.accessor, label:c.label} 
  }) 

  return <div>
    <h4>Select the columns you wish to have displayed.</h4>
    <Editor {...{value, editValue, ifield, options}} /> 
  </div>
} 
