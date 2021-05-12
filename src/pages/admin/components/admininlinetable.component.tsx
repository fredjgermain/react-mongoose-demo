import React, { useContext } from 'react'; 
import { Pager } from '../../../components/pager.component'; 

import { InlineTableContext, useInlineTable, 
  Rows, Row, Cols, InlineEntry, InlineCell, 
  THeads, THeadCell } 
  from '../../../libs/table/_table'; 

import { DaoContext } from '../../../libs/_dao'; 
import { AdminContext } from '../hooks/admin.hook'; 
import { InlineTableFeedback } from './inlinetablefeedback.component'; 
import { RoundBox } from '../../../components/roundbox.component'; 


export function AdminInlineTable() { 
  const dao = useContext(DaoContext); 
  const {collection, 
    indexedDatas, rows, cols, 
    filters, sorters, paging, 
    Create, Update, Delete, 
    GetCellArgs, GetHeadArgs} = useContext(AdminContext); 
  const defaultEntry = dao.GetDefaultIEntry(collection); 
  const [collectionLabel] = dao.GetICollections([collection]).map(c=>c.label); 
  const inlineTableContext = useInlineTable({indexedDatas, defaultEntry, Create, Update, Delete}); 

  return <InlineTableContext.Provider value={inlineTableContext} > 
    <RoundBox>
      <InlineTableFeedback /> 
      <h3>Collection: {collectionLabel}</h3> 
      <ul>
        <li>Use the "Create" at the bottom of table to create and add new entry in the selected data collection.</li> 
        <li>Use "Update" and "Delete" buttons on the right end side of each table row to update or delete the corresponding entry.</li> 
      </ul>
    <Pager {...{paging}} /> 
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
    <Pager {...{paging}} /> 
    </RoundBox>
  </InlineTableContext.Provider> 
}