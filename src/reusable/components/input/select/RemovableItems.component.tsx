import {useContext} from 'react'; 
import {SelectContext} from './select.component'; 


// REMOVABLE ITEM LIST ===============================
export function RemovableItems() { 
  const {SelectValue, selectedOptions} = useContext(SelectContext); 

  const selection = selectedOptions(); 
  return <span> 
    {selection.map( (o,i) => { 
      return <button key={i} 
        onClick={() => SelectValue(o.value)}> 
          {o.label} | X 
        </button> 
    })} 
  </span> 
}