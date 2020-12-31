import React, { useMemo, useState } from 'react'; 
import {Selecter} from '../_input.selecter'; 
import {IOption} from '../_input'; 

// To use before Tablr, 
// Can be modified from within Tablr to change displayed columns. 
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

interface ITestColumnSetting {
  options:IOption[], 
  cols:IField[], 
  OrderFields:(ifields:string[])=>void 
}
export function TestColumnSetting({options, cols, OrderFields}:ITestColumnSetting) { 
  const returnValue = (value:string[]) => OrderFields(value); 
  return <Selecter {...{options, value:cols.map(c=>c.accessor), returnValue}} type={'string'} isMulti />; 
} 