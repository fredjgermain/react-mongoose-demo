import React, { useState, useContext } from 'react'; 
import { Cell, HeadCell } from './cell.components'; 
import { TableContext } from '../hooktest/useTable.hook';


export function Head({col}:{col:string}) {
  return <th><ColContext.Provider value={{col}}> 
    <HeadCell />
  </ColContext.Provider></th>
}

export const RowContext = React.createContext({} as {row:number}); 
export function Row({row, cols}:{row:number, cols:string[]}) { 
  return <tr><RowContext.Provider value={{row}}> 
    {cols.map(col => { 
      return <Col key={col} {...{col}} /> 
    })}
  </RowContext.Provider></tr> 
}


export const InlineEntryContext = React.createContext({} as {entry:IEntry, SetEntry:(newEntry:IEntry)=>void}); 
export function InlineEntry({row, cols}:{row:number, cols:string[]}) { 
  const {datas, defaultEntry} = useContext(TableContext); 
  const _entry = datas[row] ?? defaultEntry; 
  const [entry, setEntry] = useState(_entry); 
  const SetEntry = (newEntry:IEntry) => setEntry(newEntry); 

  return <tr><RowContext.Provider key={entry._id} value={{row}}> 
    <InlineEntryContext.Provider value={{entry, SetEntry}} >
      {cols.map(col => { 
        return <Col key={col} {...{col}} /> 
      })}
    </InlineEntryContext.Provider>
  </RowContext.Provider></tr> 
}

export const ColContext = React.createContext({} as {col:string}); 
export function Col({col}:{col:string}) { 
  return <td><ColContext.Provider value={{col}}> 
    <Cell />
  </ColContext.Provider></td>
}