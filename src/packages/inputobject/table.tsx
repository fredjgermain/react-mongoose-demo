import React, {useState} from 'react'; 

interface IContext { 
  entries:any[]; 
  activeEntry: any; 
  setActiveEntry: any; 
  activeRow: number; 
  setActiveRow: any; 
  columnSettings:IField[]; 
} 
interface IProps { 
  entries:any[]; 
  columnSettings:IField[]; 
}

export const TableContext = React.createContext({} as IContext); 
export default function Table({entries, columnSettings, children}:React.PropsWithChildren<IProps>) { 
  const [activeEntry, setActiveEntry] = useState({} as any); 
  const [activeRow, setActiveRow] = useState(-1); 

  const context = {entries, activeEntry, setActiveEntry, activeRow, setActiveRow, columnSettings} as IContext; 
  return <TableContext.Provider value={context}> 
    <table>
      {children}
    </table>
  </TableContext.Provider>; 
}