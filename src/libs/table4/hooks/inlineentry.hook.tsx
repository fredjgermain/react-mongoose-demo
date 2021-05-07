import React, { useContext } from 'react'; 
import { useStateReset } from '../../_customhooks'; 
import { InlineTableContext } from '../components/inlinetable.component'; 
import { RowContext } from '../components/rows.components'; 
import { IUseInlineEntry } from '../table.types'; 



export function useInlineEntry():IUseInlineEntry { 
  const {row} = useContext(RowContext); 
  const {GetEntry, inlineState} = useContext(InlineTableContext); 
  const [entry, SetEntry] = useStateReset(GetEntry(row)); 

  const isSelected = inlineState.row === row; 
  const editModes = ['create', 'update']; 
  const isEditing = editModes.includes(inlineState.mode); 
  
  return {entry, SetEntry, isSelected, isEditing}; 
}