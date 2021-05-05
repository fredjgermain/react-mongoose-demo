import React, { useContext, useEffect } from 'react'; 
import { useStateReset } from '../../_customhooks'; 
import { RowContext, IUseInlineEntry, InlineTableContext } from '../_table'; 

export const InlineEntryContext = React.createContext({} as IUseInlineEntry); 

export function useInlineEntry():IUseInlineEntry { 
  const {GetEntry, inlineState} = useContext(InlineTableContext); 
  const {row} = useContext(RowContext); 
  const _entry = GetEntry(row); 
  const [entry, SetEntry, ResetEntry] = useStateReset(_entry); 

  const isSelected = inlineState.row === row; 
  const editModes = ['create', 'update']; 
  const isEditing = editModes.includes(inlineState.mode); 

  //if(inlineState.mode === 'read' && row === -1) 
  console.log(entry); 
  console.log(1); 
  /*useEffect(() => { 
    if(JSON.stringify(entry) != JSON.stringify(_entry)) { 
      console.log(entry); 
      ResetEntry(); 
    } 
  }, [_entry._id]); */

  /*useEffect(() => { 
    
  }, [_entry._id]) */

  return {entry, SetEntry, ResetEntry, isSelected, isEditing}; 
} 