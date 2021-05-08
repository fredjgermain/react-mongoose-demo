import React, { useContext } from 'react'; 
import { IUseInlineEntry } from '../table.types'; 
import { useInlineEntry } from '../hooks/inlineentry.hook'; 
import { RowContext } from './rows.components';
import { InlineCreateBtn, InlineUpdateDeleteBtn } from './inlinebtn.component'; 

export const InlineEntryContext = React.createContext({} as IUseInlineEntry); 
export function InlineEntry({children}:React.PropsWithChildren<{}>) { 
  const context = useInlineEntry(); 
  return <InlineEntryContext.Provider value={context}> 
    {children}<InlineBtn/> 
  </InlineEntryContext.Provider> 
} 

export function InlineBtn() { 
  const {row} = useContext(RowContext); 
  return <td>{row === 'create' ? <InlineCreateBtn/>:<InlineUpdateDeleteBtn/>}</td> 
} 