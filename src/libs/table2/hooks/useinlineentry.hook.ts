import React, { useState, useContext } from 'react'; 
import { DaoContext } from '../../dao/components/dao.contexter'; 
import { IUseInlineEntry, InlineTableContext } from '../_table'; 

export const InlineEntryContext = React.createContext({} as IUseInlineEntry); 

export function useInlineEntry(row?:number):IUseInlineEntry { 
  const dao = useContext(DaoContext); 
  const {collection} = useContext(InlineTableContext); 
  
  const [entry, setEntry] = useState(GetEntry(row)); 
  const SetEntry = (newEntry:any) => { 
    setEntry(newEntry); 
  } 

  function GetEntry(row?:number) { 
    return dao.GetIEntries(collection).find( (e,i) => i === row) 
      ?? dao.GetDefaultIEntry(collection) 
      ?? {} as IEntry; 
  } 

  return {entry, SetEntry}; 
}
