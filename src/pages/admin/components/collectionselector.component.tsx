import React, {useContext, useState} from 'react'; 
import {CrudContext} from '../../../reusable/_crud'; 
import {Select} from '../../../reusable/_input'; 


export function CollectionSelector() { 
  const {activeCollection:value, setActiveCollection:setValue, GetICollections} = useContext(CrudContext); 

  //const [value, setValue] = useState(activeCollection?.accessor); 
  const options:IOption[] = GetICollections().map( ic => { return {value:ic, label:ic.label} }); 
  const ifield = {accessor:'', label:'', defaultValue:{}, type:''} as IField; 


  return <div> 
    <Select {...{ifield, value, setValue, options}} /> 
  </div>
}
