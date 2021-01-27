import React, {useContext} from 'react'; 
import {DaoContext} from '../../../reusable/_dao'; 
import {Select} from '../../../reusable/_input'; 


export function CollectionSelector() { 
  const {activeCollection:value, setActiveCollection:setValue, GetCollections} = useContext(DaoContext); 
  const options:IOption[] = GetCollections().map( ic => { return {value:ic, label:ic.label} }); 

  return <div>
    <Select {...{value, setValue, options, placeholder:'Choose a collection'}} /> 
    </div>
}