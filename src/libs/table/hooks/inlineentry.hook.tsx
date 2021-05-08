import { useState, useEffect, useContext } from 'react'; 
//import { useStateReset } from '../../_customhooks'; 
import { InlineTableContext } from '../components/inlinetable.component'; 
import { RowContext } from '../components/rows.components'; 
import { IUseInlineEntry } from '../table.types'; 



export function useInlineEntry():IUseInlineEntry { 
  const {row} = useContext(RowContext); 
  const {GetEntry, inlineState} = useContext(InlineTableContext); 
  const _entry = GetEntry(row); 
  const [entry, SetEntry] = useState(_entry); 

  const isSelected = inlineState.row === row; 
  const editModes = ['create', 'update']; 
  const isEditing = editModes.includes(inlineState.mode); 

  const ResetEntry = JSON.stringify(_entry) != JSON.stringify(entry) && !isSelected; 

  useEffect(() => { 
    if(ResetEntry) 
      SetEntry(_entry); 
  }, [ResetEntry]); 
  
  return {entry, SetEntry, isSelected, isEditing}; 
}