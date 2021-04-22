import React from 'react'; 
import { IUseRow, useRow } from '../hooks/userow.hook'; 
import { Editor, Reader, IReader } from '../../../libs/editor_reader/_editor_reader'; 
import { InlineCreateBtn, InlineUpdateDeleteBtn } from './inlinenbtn.component'; 


// AdminRow ==================================================
export const AdminRowContext = React.createContext({} as IUseRow) 
export function AdminRow({index}:{index:number}) { 
  const context = useRow(index); 
  const {editMode, columnsArgs} = context; 
  const isCreateUpdate = ['create', 'update'].includes(editMode); 

  return <AdminRowContext.Provider value={context}> 
    <tr> 
      {columnsArgs.map( (arg,i) => { 
        return <td key={i}> 
            {isCreateUpdate ? <Editor {...arg} /> : <Reader {...(arg as IReader)} />} 
          </td> 
        })} 
      <td> 
        {index > -1 ? <InlineUpdateDeleteBtn/>: <InlineCreateBtn/>} 
      </td> 
    </tr> 
  </AdminRowContext.Provider>
}

