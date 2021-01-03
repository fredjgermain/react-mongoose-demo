import React, {useContext} from 'react'; 
import {SelectContext} from './select.component'; 


// REMOVABLE ITEM LIST ===============================
export function RemovableItems() { 
  const {value, options, Select, Selection} = useContext(SelectContext); 

  const selection = Selection(); 
  return <span> 
    {selection.map( (o,i) => { 
      return <button key={i} 
        onClick={() => Select(o.value)}> 
          {o.label} | X 
        </button> 
    })} 
  </span> 
}