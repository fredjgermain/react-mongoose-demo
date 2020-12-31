import React from 'react'; 
//import {useTablr, IUseTablr} from './useTablr'; 

// TABLR ========================================
interface ITablrContext { 
  datas:any[]; 
  ifields:IField[]; 
  // UseTablr ... 
} 
export const TablrContext = React.createContext({} as ITablrContext); 

interface ITablr { 
  datas:any[]; 
  ifields:IField[]; 
} 
export default function Tablr({datas, ifields, children}: React.PropsWithChildren<ITablr>) { 
  const context:ITablrContext = {datas, ifields}; 
  return <TablrContext.Provider value={context} > 
    <table> 
      {children} 
    </table> 
  </TablrContext.Provider> 
} 

// datas, data, row, mode, ifields, 