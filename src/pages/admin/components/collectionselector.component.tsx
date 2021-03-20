import React, { useContext } from 'react'; 
import { Select } from '../../../reusable/_input'; 
import { AdminContext } from '../admin.page'; 


// Collection Selector ====================================
export function CollectionSelector() { 
  const {GetEditState, SetEditState, GetCollectionOptions} = useContext(AdminContext); 
  const value = GetEditState(['collection']); 
  const setValue = (newValue:string) => SetEditState(newValue, ['collection']); 
  const ifield:IField = {accessor:'', label:'', defaultValue:'', type:'string'}; 
  const options = GetCollectionOptions(); 

  return <div> 
    <Select {...{value, setValue, ifield, options}} /> 
  </div> 
} 
