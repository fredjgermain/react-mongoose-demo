import {useMemo, useState} from 'react'; 


interface IReturn { 
  cols:IField[], 
  Order:(Cols:string[])=>void, 
  Sort:()=>void, 
} 
export function useColumnSetting(Cols:IField[], order?:string[]):IReturn { 
  const colsMemo = useMemo(() => Cols, []); 
  const ordered = order ? SetOrder(order): Cols; 
  const [cols, setCols] = useState(ordered); 

  // SetOrder
  function SetOrder(Cols:string[]) { 
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
    return ordered; 
  } 

  // Order 
  function Order(Cols:string[]) { 
    const ordered = SetOrder(Cols); 
    if(JSON.stringify(ordered) !== JSON.stringify(cols)) 
      setCols(ordered); 
  } 

  // 
  function Sort() { 

  }


  return {cols, Order, Sort}; 
}