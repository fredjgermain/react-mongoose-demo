import React, {useContext} from 'react'; 
import {DaoContext} from '../../../reusable/_dao'; 
import {Select} from '../../../reusable/_input'; 


export function CollectionSelector() { 
  const {activeCollection:value, setActiveCollection:setValue, collections} = useContext(DaoContext); 
  const options:IOption[] = collections().map( ic => { return {value:ic, label:ic.label} }); 

  return <div>
    <Select {...{value, setValue, options, placeholder:'Choose a collection'}} /> 
    </div>
}