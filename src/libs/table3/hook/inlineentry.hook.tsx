import React, { useEffect, useState, useContext } from 'react'; 
import { InlineTableContext } from './inlinetable.hook'; 

export interface IUseInlineEntry { 
  entry: IEntry; 
  SetEntry: (newEntry:IEntry) => void; 
  isSelected: boolean; 
  isEditing: boolean; 
} 
export const InlineEntryContext = React.createContext({} as IUseInlineEntry); 
export function useInlineEntry(row:number): IUseInlineEntry { 
  const {datas, defaultEntry, inlineState} = useContext(InlineTableContext); 
  const _entry = datas[row] ?? defaultEntry; 
  const [entry, setEntry] = useState(_entry); 
  const SetEntry = (newEntry:IEntry) => setEntry(newEntry); 
  const isSelected = inlineState.row === row; 
  const editing = ['create', 'update']; 
  const isEditing = editing.includes(inlineState.mode); 

  const inlineEntryNeedsReset = JSON.stringify(_entry) != JSON.stringify(entry) && !isEditing; 

  useEffect(() => { 
    SetEntry(_entry); 
  }, [inlineEntryNeedsReset]) 

  return {entry, SetEntry, isSelected, isEditing} 
} 
