import React from 'react'; 
import {IColumnSetting} from '../common'; 

interface IContext { 
  obj:any, 
  setObj: any, // function ... 
  columnSettings: IColumnSetting[]; 
} 
interface IProps { 
  obj:any, 
  setObj: React.Dispatch<any>, 
  columnSettings:IColumnSetting[], 
} 
export const InputObjectContext = React.createContext({} as IContext); 
export default function InputObject({obj, setObj, columnSettings, children}:React.PropsWithChildren<IProps>) { 

  const context:IContext = {obj, setObj, columnSettings}; 
  return <InputObjectContext.Provider value={context}> 
    {JSON.stringify(obj)} 
    {children} 
  </InputObjectContext.Provider>; 
}