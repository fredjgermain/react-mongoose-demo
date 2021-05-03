import React, { useContext } from 'react'; 
import { Cell } from './cell.components'; 

import { InlineEntryContext, InlineTableContext, TCols, useInlineEntry, 
  InlineCreateBtn, InlineUpdateDeleteBtn } 
  from '../../../libs/table/_table'; 


const ReadEntryContext = React.createContext(null); 
function RowRead({collectionAccessor}:{collectionAccessor:string}) { 
  const {cols, GetRowCol} = useContext(InlineTableContext); 
  const {row} = GetRowCol(); 
  return <ReadEntryContext.Provider value={null} >
    <td>{row}</td>
    <TCols cols={cols}>
      <Cell {...{collectionAccessor}} />
    </TCols> 
    <InlineBtn/>
  </ReadEntryContext.Provider>
}

function RowSelected({collectionAccessor}:{collectionAccessor:string}) { 
  const {cols, GetRowCol} = useContext(InlineTableContext); 
  const {row} = GetRowCol(); 
  const inlineEntry = useInlineEntry(row); 
  return <InlineEntryContext.Provider value={inlineEntry}> 
    <td>{row}</td>
    <TCols cols={cols}>
      <Cell {...{collectionAccessor}} />
    </TCols> 
    <InlineBtn/>
  </InlineEntryContext.Provider> 
}

function InlineBtn() { 
  const {GetRowCol} = useContext(InlineTableContext); 
  const {row} = GetRowCol(); 

  return <td>{row === -1 ? <InlineCreateBtn />: <InlineUpdateDeleteBtn/>}</td>
}


export function Row({collectionAccessor}:{collectionAccessor:string}) { 
  const {IsSelected} = useContext(InlineTableContext); 
  if(IsSelected()) 
    return <RowSelected {...{collectionAccessor}} /> 
  return <RowRead {...{collectionAccessor}} /> 
}
