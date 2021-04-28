import React, { useState, useContext, useEffect } from 'react'; 
import { DaoContext } from '../../dao/components/dao.contexter'; 
import { InlineTableContext } from './useinlinetable.hook'; 

export const InlineEntryContext = React.createContext({} as IUseInlineEntry); 

export interface IUseInlineEntry { 
  entry: IEntry; 
  SetEntry: (newEntry: any) => void; 
  isSelected: boolean; 
  isEditing: boolean; 
} 

export function useInlineEntry(row?:number) { 
  const dao = useContext(DaoContext); 
  const {collectionAccessor, inlineTableState, inlineFeedback} = useContext(InlineTableContext); 

  const [entry, setEntry] = useState(GetEntry(row)); 
  const SetEntry = (newEntry:any) => { 
    setEntry(newEntry); 
  } 

  const editingModes = ['update', 'create']; 
  const isSelected = row === inlineTableState.row; 
  const isEditing = editingModes.includes(inlineTableState.mode); 
  
  useEffect(() => { 
    SetEntry(GetEntry(row)); 
  }, [row]); 

  function GetEntry(row?:number) { 
    return dao.GetIEntries(collectionAccessor).find( (e,i) => i === row) 
      ?? dao.GetDefaultIEntry(collectionAccessor) 
      ?? {} as IEntry; 
  } 

  return {entry, SetEntry, isSelected, isEditing}; 
}
