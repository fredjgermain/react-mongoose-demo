import React, { useContext, useState } from 'react'; 
import { DaoContext } from '../../libs/_dao'; 
import { IUseAdmin } from './admin.type'; 

export const AdminContext = React.createContext({} as IUseAdmin); 
export function useAdmin() { 
  const dao = useContext(DaoContext); 
  const [collectionAccessor, setCollectionAccessor] = useState<string>(''); 
  function SetCollectionAccessor(newCollectionAccessor:string) { 
    setCollectionAccessor(newCollectionAccessor); 
  } 

  
  function GetCollectionOptions():IOption[] { 
    const collections = dao.GetICollections(); 
    return collections.map( c => { 
      return {value:c.accessor, label:c.label} 
    }); 
  } 

  function GetCollection():ICollection { 
    const [collection] =  dao.GetICollections([collectionAccessor]); 
    return collection; 
  }

  return {collectionAccessor, SetCollectionAccessor, GetCollectionOptions, GetCollection}; 
} 