import React, { useContext } from 'react'; 
import { Select } from '../../../reusable/_input'; 
import { AdminContext } from '../admin.page'; 


// Collection Selector ====================================
export function CollectionSelector() { 
  const {Get, Set, GetCollectionOptions} = useContext(AdminContext); 
  const value = Get(['collection']); 
  const setValue = (newValue:string) => Set(newValue, ['collection']); 
  const ifield:IField = {accessor:'', label:'', defaultValue:'', type:'string'}; 
  const options = GetCollectionOptions(); 

  return <Select {...{value, setValue, ifield, options}} /> 
} 
