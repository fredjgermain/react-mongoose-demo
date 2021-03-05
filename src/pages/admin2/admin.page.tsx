import React, { useContext } from 'react'; 
import { useAdmin, IUseAdmin } from './useadmin.hook'; 
import { Select } from '../../reusable/_input'; 

/*
- title 
- CollectionSelector. 
- AdminTablr once a collection has been selected. 
*/ 
export const AdminContext = React.createContext({} as IUseAdmin); 
export default function AdminPage() { 
  const context = useAdmin(); 
  return <AdminContext.Provider value={context}> 
    {context.Get(['collection'])}
    <CollectionSelector/> 
    ADMIN 
  </AdminContext.Provider>  
} 

export function CollectionSelector() { 
  const {Get, Set, GetCollectionOptions} = useContext(AdminContext); 
  const value = Get(['collection']); 
  const setValue = (newValue:string) => Set(newValue, ['collection']); 
  const ifield:IField = {accessor:'', label:'', defaultValue:'', type:'string'}; 
  const options = GetCollectionOptions(); 

  return <Select {...{value, setValue, ifield, options}} />
}