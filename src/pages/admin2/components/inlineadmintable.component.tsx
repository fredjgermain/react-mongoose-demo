import { useContext } from 'react';
import { PagerBtn } from '../../../libs/pager/_pager'; 
import { HeaderCell } from './cell.components'; 
import { Row } from './row.components'; 

import { THeads, TRows, TRow, 
  InlineTableContext, useInlineTable, InlineTableFeedback } 
  from '../../../libs/table/_table'; 

import { AdminContext } from '../admin.hook'; 


export function InlineTable() { 
  const {collectionAccessor, GetCollection} = useContext(AdminContext); 
  const collectionLabel = GetCollection().label; 
  const inlineTable = useInlineTable(collectionAccessor ?? ''); 
  const {rows, cols, paging} = inlineTable; 

  return <InlineTableContext.Provider value={inlineTable} > 
    <br/>
    <InlineTableFeedback {...{collectionAccessor}} /> 
    <h2>Collection: {collectionLabel}</h2> 
    <br/> 
    <table> 
      <thead><tr> 
        <THeads {...{cols}}><HeaderCell /></THeads> 
        <th>Btn</th> 
      </tr></thead> 

      <tbody> 
        <TRows {...{rows}}><Row/></TRows> 
        <TRow {...{row:-1}}><Row/></TRow> 
      </tbody> 
    </table> 
    <PagerBtn {...{paging}} /> 
  </InlineTableContext.Provider> 
} 
