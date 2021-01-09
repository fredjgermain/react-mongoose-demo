//import React from 'react'; 

// Read Array ===================================
export function ReadArray({values=[], maxLength=20}:{values:any[], maxLength?:number}) { 
  let display = ''; 
  for(let i = 0; i < values.length; i++) { 
    const comma = i < values.length-1 ? ', ':''; 
    display = display + JSON.stringify(values[i]) + comma; 
    if(display.length > maxLength) { 
      display += ' ...'; 
      break; 
    } 
  } 
  return <span>[ {display} ]</span> 
} 