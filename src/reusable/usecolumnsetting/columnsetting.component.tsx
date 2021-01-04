import {useMemo, useState} from 'react'; 



// Use Column Setting =========================== 
export function useColumnSetting(ifields:IField[]) { 
  const memIfields = useMemo(() => ifields, []); 
  const [cols, setCols] = useState(ifields); 

  // TEMPORARY
  function OrderFields(ifields:string[]) { 
    const ordered:IField[] = []; 
    ifields.forEach( f => { 
      const found = memIfields.find(mf => mf.accessor === f); 
      if(found) 
        ordered.push(found); 
    }) 
    setCols(ordered); 
  } 
  return {memIfields, cols, OrderFields}; 
} 
