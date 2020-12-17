import {useMemo, useState} from 'react'; 


interface IReturn { 
  cols:IField[], 
  Order:(Cols:string[])=>void, 
  Sort:()=>void, 
} 
export function useColumnSetting(Cols:IField[]):IReturn { 
  const colsMemo = useMemo(() => Cols, []); 

  const [cols, setCols] = useState(Cols); 


  // Order 
  function Order(Cols:string[]) { 
    let ordered:IField[] = []; 
    const named = colsMemo.filter( f => Cols.includes(f.accessor)); 
    const star = colsMemo.filter( f => !Cols.includes(f.accessor)); 

    Cols.forEach( c => { 

      if(c==='*') 
        ordered = ordered.concat(star); 
      else { 
        const found = named.find(f => f.accessor===c); 
        if(found) 
          ordered.push(found); 
      }
    }); 
    if(JSON.stringify(ordered) !== JSON.stringify(cols)) 
      setCols(ordered); 
  } 

  // 
  function Sort() { 

  }


  return {cols, Order, Sort}; 
}