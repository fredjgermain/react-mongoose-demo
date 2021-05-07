import React from 'react'; 
import { Table } from './table.components'; 
import { useInlineTable } from '../hooks/inlinetable.hook'; 
import { IInlineTable, IUseInlineTable } from '../table.types'; 

export const InlineTableContext = React.createContext({} as IUseInlineTable) 
export function InlineTable({indexedDatas, defaultEntry, Create, Update, Delete, children}:React.PropsWithChildren<IInlineTable>) { 
  const context = useInlineTable({indexedDatas, defaultEntry, Create, Update, Delete}); 

  return <InlineTableContext.Provider value={context}> 
    <Table {...{indexedDatas}} > 
      {children} 
    </Table> 
  </InlineTableContext.Provider> 
} 