import React, { useContext, useEffect } from 'react'; 
import { useStateReset } from '../../_customhooks'; 
import { RowContext, IUseInlineEntry, InlineTableContext } from '../_table'; 


export const InlineEntryContext = React.createContext({} as IUseInlineEntry); 

export function useInlineEntry():IUseInlineEntry { 
  console.log('useLineEntry')
  const {GetEntry, inlineState} = useContext(InlineTableContext); 
  const {row} = useContext(RowContext); 
  const _entry = GetEntry(row); 
  
  const [entry, SetEntry, ResetEntry] = useStateReset(_entry); 

  const isSelected = inlineState.row === row; 
  const editModes = ['create', 'update']; 
  const isEditing = editModes.includes(inlineState.mode); 

  useEffect(() => { 
    if(JSON.stringify(entry) != JSON.stringify(_entry)) { 
      ResetEntry(); 
    } 
  }, [_entry._id]); 

  if(row === -1) 
    console.log(entry); 
  console.log(12);
  

  return {entry, SetEntry, ResetEntry, isSelected, isEditing}; 
} 