import React, {useContext, useState} from 'react'; 
import {useDao, EActionType, IUseDao} from '../dao2/usedao2.hook'; 


// ICrudContext ------------------------------------------- 
interface ICrudContext extends IUseDao { 
  collection: ICollection; 
  setCollection: React.Dispatch<ICollection>; 
  entry: IEntry; 
  setEntry: React.Dispatch<IEntry>; 
  mode: string; 
  setMode: React.Dispatch<string>; 
} 
export const CrudContext = React.createContext({} as ICrudContext); 



// CrudContexter ========================================== 
export function CrudContexter() { 
  const {} = useContext(CrudContext); 
  const {} = useContext(); 

} 



// UseCrud ================================================ 
export function useCrud() { 
  const {GetICollections} = useContext(DaoContext); 

  const [collection, setCollection] = useState({} as ICollection); 
  const [entry, setEntry] = useState({} as IEntry); 
  const [mode, setMode] = useState(''); 
} 
