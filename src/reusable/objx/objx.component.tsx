import React from 'react'; 


// Objx ===========================================
interface IObjx{ 
  obj:any; 
  setObj: React.Dispatch<any>; 
  ifields: IField[]; 
}
export const ObjxContext = React.createContext({} as IObjx); 
export default function Objx({children, ...props}:React.PropsWithChildren<IObjx>) { 
  
  // RENDER --------------------------------------
  return <ObjxContext.Provider value={props}> 
    {children} 
  </ObjxContext.Provider>; 
} 