import React from 'react'; 


export const TableContext = React.createContext({} as {indexedDatas:any}) 
export function Table({indexedDatas, children}:React.PropsWithChildren<{indexedDatas:any}>) { 
  
  return <TableContext.Provider value={{indexedDatas}}><table> 
    {children} 
  </table></TableContext.Provider> 
} 