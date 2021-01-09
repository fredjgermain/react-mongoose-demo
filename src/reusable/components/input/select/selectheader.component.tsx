import React, {useContext} from 'react'; 
import {SelectContext} from './select.component'; 
import {RemovableItems} from './RemovableItems.component'; 



// SELECT HEADER ================================
export function SelectHeader() { 
  const {placeholder, selectedOptions} = useContext(SelectContext); 

  const selection = selectedOptions(); 
  return <div className={'select_header'}> 
    <div className={'select_header_removable_items'}> 
      {selection.length > 0 ? <RemovableItems />: placeholder} 
    </div> 
    <FoldBtn /> 
  </div> 
} 




function FoldBtn() { 
  const {fold, Fold, Focus} = useContext(SelectContext); 

  return <div className={'select_header_foldbtn'}> 
    { fold ? 
      <button 
        onClick={() => Fold(false)} 
        onMouseUp={() => Focus(true)} >V</button> : 
      <button 
        onMouseDown={() => Focus(false)} 
        onClick={() => Fold(true)} 
      >Λ</button> } 
  </div> 
} 

