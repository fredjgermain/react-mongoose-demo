import React, {useContext} from 'react'; 
import {CrudContext} from '../../../reusable/_crud'; 
import {Select} from '../../../reusable/_input'; 


export function CollectionSelector() { 
  const {activeCollection:value, setActiveCollection:setValue, GetICollections} = useContext(CrudContext); 
  const options:IOption[] = GetICollections().map( ic => { return {value:ic, label:ic.label} }); 

  return <div>
    <Select {...{value, setValue, options, placeholder:'Choose a collection'}} /> 
  </div>
}