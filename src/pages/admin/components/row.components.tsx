import React, { useContext } from 'react'; 
import { Cell } from './cell.components'; 

import { InlineEntryContext, InlineTableContext, TCols, useInlineEntry, 
  InlineCreateBtn, InlineUpdateDeleteBtn } 
  from '../../../libs/table/_table'; 




export function Row() { 
  const {IsSelected} = useContext(InlineTableContext); 
  if(IsSelected()) 
    return <RowSelected/> 
  return <RowRead/> 
}

const ReadEntryContext = React.createContext(null); 
function RowRead() { 
  const {cols, GetRowCol} = useContext(InlineTableContext); 
  const {row} = GetRowCol(); 
  return <ReadEntryContext.Provider value={null} >
    <TCols cols={cols}> 
      <Cell/>
    </TCols> 
    <InlineBtn/>
  </ReadEntryContext.Provider>
}

function RowSelected() { 
  const {cols, GetRowCol} = useContext(InlineTableContext); 
  const {row} = GetRowCol(); 
  const inlineEntry = useInlineEntry(row); 
  return <InlineEntryContext.Provider value={inlineEntry}> 
    <TCols cols={cols}>
      <Cell/>
    </TCols> 
    <InlineBtn/>
  </InlineEntryContext.Provider> 
}

function InlineBtn() { 
  const {GetRowCol} = useContext(InlineTableContext); 
  const {row} = GetRowCol(); 

  return <td>{row === -1 ? <InlineCreateBtn />: <InlineUpdateDeleteBtn/>}</td>
}
