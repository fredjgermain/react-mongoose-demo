import React, { useState, useContext } from 'react'; 
import { RowContext, Col } from './rowcol.components'; 
import { IUseInlineEntry, InlineEntryContext, useInlineEntry } from '../hook/inlineentry.hook';
import { InlineCreateBtn, InlineUpdateDeleteBtn } 
  from '../components/inlinebtn.component'; 

export function InlineEntry({row, cols}:{row:number, cols:string[]}) { 
  const context = useInlineEntry(row); 
  return <tr><RowContext.Provider value={{row}}> 
    <InlineEntryContext.Provider value={context} > 
      {cols.map(col => { 
        return <Col key={col} {...{col}} /> 
      })} 
      <InlineBtn />
    </InlineEntryContext.Provider> 
  </RowContext.Provider></tr> 
} 


function InlineBtn() { 
  const {row} = useContext(RowContext); 
  return <td>{row === -1 ? <InlineCreateBtn />: <InlineUpdateDeleteBtn/>}</td> 
} 