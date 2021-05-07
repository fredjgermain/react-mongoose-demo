import React, { useState, useContext } from 'react'; 
import { RowContext, Col } from './rowcol.components'; 
import { IUseInlineEntry, InlineEntryContext, useInlineEntry } from '../hooktest/useInlineEntry.hook';

export function InlineEntry({row, cols}:{row:number, cols:string[]}) { 
  const context = useInlineEntry(row); 
  return <tr><RowContext.Provider key={context.entry._id} value={{row}}> 
    <InlineEntryContext.Provider value={context} > 
      {cols.map(col => { 
        return <Col key={col} {...{col}} /> 
      })} 
    </InlineEntryContext.Provider> 
  </RowContext.Provider></tr> 
} 