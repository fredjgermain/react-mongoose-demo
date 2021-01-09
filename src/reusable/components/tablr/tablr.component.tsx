import React from 'react'; 

// TABLR ========================================
interface ITablr { datas:any[]; } 
export const TablrContext = React.createContext({} as ITablr); 
export function Tablr({datas, children}: React.PropsWithChildren<ITablr>) { 
  const context = {datas}; 

  // RENDER -------------------------------------
  return <TablrContext.Provider value={context} > 
      <table>{children}</table> 
    </TablrContext.Provider> 
} 