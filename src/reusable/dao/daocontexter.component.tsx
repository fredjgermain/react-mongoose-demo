import React from 'react'; 
import {DataAccessObject, IUseDao, useDao, ICrud} from './_dao'; 
import {CrudMongoose} from '../mongooseparser/_mongooseparser'; 



// DAO Contexter ================================ 
export const DaoContext = React.createContext({} as IUseDao); 

interface IDaoContexter { 
  baseUrl:string; 
} 
export function DaoContexter({baseUrl, children}:React.PropsWithChildren<IDaoContexter>) { 
  const context = useDao( new DataAccessObject( new CrudMongoose(baseUrl) as ICrud ) ); 

  return <DaoContext.Provider value={context} > 
    {children} 
  </DaoContext.Provider> 
  //const crud = new CrudMongoose(`https://fjg-mongoose-heroku.herokuapp.com/api/`); 
} 