export { THead, THeadContext, THeads, THeadsContext, 
    Table, TableContext, 
    Rows, RowsContext, Row, RowContext, 
    Cols, ColsContext, Col, ColContext} 
  from './components/table.component'; 

export { InlineBtn, InlineCreateBtn, InlineUpdateDeleteBtn } 
  from './components/inlinebtn.component'; 

export { InlineTableFeedback } from './components/inlinetablefeedback.component'; 

export { useColumn } from './hooks/usecolumns.hook'; 
export { InlineEntryContext, useInlineEntry } from './hooks/useinlineentry.hook'; 
export { InlineTableContext, useInlineTable } from './hooks/inlinetable.hook';

export type { IUseInlineEntry, IUseInlineTable, InlineState } from './table.types'; 
