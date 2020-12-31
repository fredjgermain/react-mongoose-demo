import React, {useContext} from 'react'; 
import {RowContext} from './rows.component'; 
import {TablrContext} from './tablr.component'; 



// CELLS ========================================
const CellsContext = React.createContext({}); 
interface ICells{} 
export function Cells({children}:React.PropsWithChildren<ICells>) { 
  const {ifields} = useContext(RowContext); 

  // Render -------------------------------------
  return <CellsContext.Provider value={{}} > 
    {ifields.map((ifield,i) => { 
      return <Cell key={i} {...{ifield, children}} />; 
    })} 
  </CellsContext.Provider> 
} 


// Row --------------------------------------------
interface ICellContext { 
  row: number; 
  ifield: IField; 
} 
export const CellContext = React.createContext({} as ICellContext); 
interface ICell { 
  ifield: IField; 
} 
export function Cell({ifield, children}:React.PropsWithChildren<ICell>) { 
  const {datas} = useContext(TablrContext); 
  const {row} = useContext(RowContext); 
  const context = {row, ifield} as ICellContext; 
  
  // RENDER -------------------------------------
  if(!children) { 
    const value = datas[row][ifield.accessor] ?? ifield.defaultValue; 
    return <td> 
      <CellContext.Provider value={context}> 
        {JSON.stringify(value)} 
      </CellContext.Provider> 
    </td> 
  }
  return <td> 
    <CellContext.Provider value={context}> 
      {children} 
    </CellContext.Provider> 
  </td> 
} 
