import React from 'react'; 
import {FieldRendering} from '../_fieldrendering';

// CONTEXT
interface IContext { 
  obj:any; 
  setObj: any; // function ... 
  columnSettings: IField[]; 
  fieldRendering?: FieldRendering; 
} 
export const ObjxContext = React.createContext({} as IContext); 


// OBJX =========================================
interface IProps { 
  obj:any; 
  setObj: React.Dispatch<any>; 
  columnSettings: IField[]; 
  fieldRendering?: FieldRendering; 
} 
export default function Objx({obj, setObj, columnSettings, fieldRendering, children}:React.PropsWithChildren<IProps>) { 
  const context:IContext = {obj, setObj, columnSettings, fieldRendering}; 
  return <ObjxContext.Provider value={context}> 
    {children} 
  </ObjxContext.Provider>; 
}
