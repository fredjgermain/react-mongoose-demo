import React, {useContext} from 'react'; 
import {SelectContext} from './select.component'; 
import {RemovableItems} from './RemovableItems.component'; 



// SELECT HEADER ================================
export function SelectHeader() { 
  const {placeholder, Selection} = useContext(SelectContext); 

  const selection = Selection(); 
  return <div className={'select_header'}> 
    <div className={'select_header_removable_items'}> 
      {selection.length > 0 ? <RemovableItems />: placeholder} 
    </div> 
    <FoldBtn /> 
  </div> 
} 

function FoldBtn() { 
  const {fold, Fold} = useContext(SelectContext); 
  return <div className={'select_header_foldbtn'}> 
    { fold ? <button onClick={Fold}>V</button> : <button onClick={Fold}>Λ</button> } 
  </div> 
} 
