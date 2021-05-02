import React, { useState, useContext, useEffect } from 'react'; 
import { DaoContext } from '../../dao/components/dao.contexter'; 
import { InlineTableContext } from './useinlinetable.hook'; 

export const InlineEntryContext = React.createContext({} as IUseInlineEntry); 

export interface IUseInlineEntry { 
  entry: IEntry; 
  SetEntry: (newEntry: any) => void; 
} 

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
