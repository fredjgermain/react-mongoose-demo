export { THead, THeadContext, THeader, THeads, THeadsContext } 
  from './components/header.components'; 

  export { InlineBtn, InlineCreateBtn, InlineUpdateDeleteBtn } 
  from './components/inlinebtn.component'; 

export { InlineTableFeedback } from './components/inlinetablefeedback.component'; 

export { TCol, TColContext, TCols, TColsContext, TRow, TRowContext, TRows, TRowsContext } 
  from './components/rowcol.components'; 

export { useColumn } from './hooks/usecolumns.hook'; 
export { InlineEntryContext, useInlineEntry } from './hooks/useinlineentry.hook'; 
export { InlineTableContext, useInlineTable } from './hooks/useinlinetable.hook'; 
export { TableContext, useTable } from './hooks/usetable.hook'; 

export type { IInlineTableState, IUseColumn, IUseInlineEntry, IUseTable } from './table.type'; 