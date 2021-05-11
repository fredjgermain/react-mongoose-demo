import React, { useContext } from 'react'; 
import { Editor } from '../../../libs/editor_reader/_editor_reader'; 
import { DaoContext } from '../../../libs/_dao'; 
import { AdminContext } from '../hooks/admin.hook'; 


export function CollectionSelector() { 
  const dao = useContext(DaoContext); 
  const {collection:value, SetCollection:editValue} = useContext(AdminContext); 
  const ifield:IField = {accessor:'', label:'', defaultValue:'', type:'string'}; 
  const collections = dao.GetICollections(); 
  const options:IOption[] = collections.map(c=> { 
    return {value:c.accessor, label:c.label} 
  }) 

  return <Editor {...{value, editValue, ifield, options}} /> 
} 
