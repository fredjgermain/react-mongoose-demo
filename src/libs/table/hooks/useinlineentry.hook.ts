import React, { useState, useContext, useEffect } from 'react'; 
import { DaoContext } from '../../dao/components/dao.contexter'; 
import { IUseInlineEntry, InlineTableContext } from '../_table'; 

export const InlineEntryContext = React.createContext({} as IUseInlineEntry); 

export function useInlineEntry(row?:number):IUseInlineEntry { 
  const dao = useContext(DaoContext); 
  const {collectionAccessor, inlineTableState} = useContext(InlineTableContext); 
  
  const [entry, setEntry] = useState(GetEntry(row)); 
  const SetEntry = (newEntry:any) => { 
    setEntry(newEntry); 
  } 
  
  useEffect(() => { 
    SetEntry(GetEntry(row)); 
  }, [row, JSON.stringify(inlineTableState)]); 

  function GetEntry(row?:number) { 
    return dao.GetIEntries(collectionAccessor).find( (e,i) => i === row) 
      ?? dao.GetDefaultIEntry(collectionAccessor) 
      ?? {} as IEntry; 
  } 

  return {entry, SetEntry}; 
}
