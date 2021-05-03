import { PagerBtn } from '../../../libs/pager/_pager'; 
import { HeaderCell } from './cell.components'; 
import { Row } from './row.components'; 

import { THeads, TRows, TRow, 
  InlineTableContext, useInlineTable, InlineTableFeedback } 
  from '../../../libs/table/_table'; 



function InlineTable({collectionAccessor}:{collectionAccessor:string}) {
  const inlineTable = useInlineTable(collectionAccessor); 
  const {rows, cols, paging} = inlineTable; 

  return <InlineTableContext.Provider value={inlineTable} > 
    <InlineTableFeedback {...{collectionAccessor}} /> 
    <table> 
      <thead><tr> 
        <th>Row</th> 
        <THeads {...{cols}}><HeaderCell {...{collectionAccessor}} /></THeads> 
        <th>Btn</th> 
      </tr></thead> 

      <tbody> 
        <TRows {...{rows}}><Row {...{collectionAccessor}} /></TRows> 
        <TRow {...{row:-1}}><Row {...{collectionAccessor}} /></TRow> 
      </tbody> 
    </table> 
    <PagerBtn {...{paging}} /> 
  </InlineTableContext.Provider> 
}
