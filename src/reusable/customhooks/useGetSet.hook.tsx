import {useState, useEffect} from 'react'; 
import {GetValueAt, SetValueAt} from '../_utils'; 


export function useGetSet<T>(_value:T, syncIn?:T, syncOut?:React.Dispatch<React.SetStateAction<T>>) { 
  const [value, setValue] = useState(_value); 

  // sync in if syncIn is defined and syncIn has changed. 
  useEffect(() => { 
    if(syncIn && JSON.stringify(syncIn) !== JSON.stringify(value) ) 
      setValue(syncIn); 
  }, [JSON.stringify(syncIn)]); 

  // Sync out if syncOut is defined and value has changed
  useEffect(() => { 
    if(syncOut) 
      syncOut((prev:any) => value); 
  }, [JSON.stringify(value)]); 

  // Set 
  function Set(newValue:any, keys?:any[]) { 
    setValue((prev:T) => { 
      return SetValueAt(prev, newValue, keys); 
    }) 
  } 

  // Get 
  function Get(keys?:any[]) { 
    GetValueAt(value, keys); 
  } 

  return {Get, Set}
}