import React, { useContext } from 'react'; 
import { IUseEntry, useEntry } from '../hooks/useentry.hook'; 
import { Reader, Editor } from '../../../reusable/_input'; 
import { DaoContext } from '../../../reusable/_dao'; 
import { InlineCreateBtn, InlineUpdateDeleteBtn } from './inlinenbtn.component'; 



// ENTRY ==================================================
export const EntryContext = React.createContext({} as IUseEntry) 
export function Entry({index}:{index:number}) { 
  const {GetIOptions} = useContext(DaoContext); 
  const context = useEntry(index); 
  const {editMode, Get, Set, Args, GetColumnsIField} = context; 
  const isCreateUpdate = ['create', 'update'].includes(editMode); 
  const ifields = GetColumnsIField(); 

  function Cell(ifield:IField) { 
    const value = Get([ifield.accessor]); 
    const setValue = (newValue:any) => Set(newValue, [ifield.accessor]); 
    const options = GetIOptions(ifield); 
    return isCreateUpdate ? <Editor {...{value, setValue, ifield, options}} /> : <Reader {...{value, ifield, options}} /> 
  }

  return <EntryContext.Provider value={context}> 
    <tr> 
      {ifields.map( ifield => <td key={ifield.accessor}>{Cell(ifield)}</td> )} 
      <td> 
        {index > -1 ? <InlineUpdateDeleteBtn/>: <InlineCreateBtn/>} 
      </td> 
    </tr> 
  </EntryContext.Provider>
}

/*
export const IndexedContext = React.createContext({} as {value:any}); 
export const IndexesContext = React.createContext({} as any); 
export const IndexContext = React.createContext({} as {index:number|string}); 

export function Indexed({value, children}:React.PropsWithChildren<{value:any}>) { 
  return <IndexedContext.Provider value={{value}}> 
    {children} 
  </IndexedContext.Provider> 
} 

export function Indexes({indexes, children}:React.PropsWithChildren<{indexes:(string|number)[]}>) { 
  return <IndexesContext.Provider value={{}}> 
    {indexes.map( index => { 
      return <Index key={index} index={index}> 
        {children} 
      </Index> 
    })} 
    {children} 
  </IndexesContext.Provider> 
} 

export function Index({index, children}:React.PropsWithChildren<{index:(string|number)}>) { 
  return <IndexContext.Provider value={{index}} > 
    {children} 
  </IndexContext.Provider> 
}
*/