import React from 'react'; 

interface IProps { 
  obj:any, 
  setObj: React.Dispatch<any>, 
  columnSettings: IField[]
} 
export default function InputObject({obj, setObj, columnSettings, children}:React.PropsWithChildren<IProps>) { 
  const context:IContext = {obj, setObj, columnSettings}; 
  return <InputObjectContext.Provider value={context}> 
    {JSON.stringify(obj)} 
    {children} 
  </InputObjectContext.Provider>; 
}

interface IContext { 
  obj:any, 
  setObj: any, // function ... 
  columnSettings: IField[]
} 
export const InputObjectContext = React.createContext({} as IContext); 