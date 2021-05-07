import React from 'react'; 
import { IUseInlineEntry } from '../table.types'; 
import { useInlineEntry } from '../hooks/inlineentry.hook'; 

export const InlineEntryContext = React.createContext({} as IUseInlineEntry); 
export function InlineEntry({children}:React.PropsWithChildren<{}>) { 
  const context = useInlineEntry(); 
  return <InlineEntryContext.Provider value={context}> 
    {children} 
  </InlineEntryContext.Provider> 
} 