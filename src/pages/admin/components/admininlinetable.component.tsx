import React, { useContext } from 'react'; 
import { PageOfPages, PagerBtn } from '../../../libs/pager/_pager'; 

import { InlineTableContext, useInlineTable, 
  Rows, Row, Cols, InlineEntry, InlineCell, 
  THeads, THeadCell } 
  from '../../../libs/table/_table'; 

import { DaoContext } from '../../../libs/_dao'; 
import { AdminContext } from '../hooks/admin.hook'; 
import { InlineTableFeedback } from './inlinetablefeedback.component'; 


export function AdminInlineTable() { 
  const dao = useContext(DaoContext); 
  const {collection, 
    indexedDatas, rows, cols, 
    filters, sorters, paging, 
    Create, Update, Delete, 
    GetCellArgs, GetHeadArgs} = useContext(AdminContext); 
  const defaultEntry = dao.GetDefaultIEntry(collection); 
  const inlineTableContext = useInlineTable({indexedDatas, defaultEntry, Create, Update, Delete}); 

  return <InlineTableContext.Provider value={inlineTableContext} > 
    <InlineTableFeedback /> 
    <PageOfPages {...{paging}} /> 
    <PagerBtn {...{paging}} /> 
    <table> 
      <thead> 
        <tr><THeads {...{cols}} > 
          <THeadCell {...{GetHeadArgs}}/> 
          <br/> 
        </THeads><th>Btn</th></tr> 
      </thead> 

      <tbody> 
      <Rows {...{rows}}> 
        <InlineEntry> 
          <Cols {...{cols}} > 
            <InlineCell {...{GetCellArgs}} /> 
          </Cols> 
        </InlineEntry> 
      </Rows> 
      <Row {...{row:'create'}}> 
        <InlineEntry> 
          <Cols {...{cols}} > 
            <InlineCell {...{GetCellArgs}} /> 
          </Cols> 
        </InlineEntry> 
      </Row>
      </tbody> 
    </table>
    <PageOfPages {...{paging}} /> 
    <PagerBtn {...{paging}} /> 
  </InlineTableContext.Provider> 
}