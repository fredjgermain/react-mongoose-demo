import {useEffect, useState} from 'react'; 

// IDao =========================================
export interface IDao { 
  Create: (accessor:string, entry:IEntry) => Promise<IResponse>; 
  Update: (accessor:string, entry:IEntry) => Promise<IResponse>; 
  Delete: (accessor:string, entry:IEntry) => Promise<IResponse>; 
  GetForeignOptions: (ifield:IField) => IOption[]; 
  GetForeignValue: (ifield:IField, id:string) => any|undefined; 
  GetICollection: (accessor:string) => ICollection|void; 
} 

// ICRUDHOOK ------------------------------------
export interface ICrudHook { 
  entries: IEntry[]; 
  response: IResponse; 
  Create: (entry:any) => Promise<boolean>; 
  Update: (entry:any) => Promise<boolean>; 
  Delete: (entry:any) => Promise<boolean>; 
}
// useCrud ======================================
export function useCrud(dao:IDao, icollection:ICollection) { 
  const [entries, setEntries] = useState(icollection.entries); 
  const [response, setResponse] = useState({} as IResponse); 

  useEffect(() => { 
    setEntries(icollection.entries); 
  },[JSON.stringify(icollection.accessor)]) 

  // Build Crud methods 
  const Create = async (entry:IEntry):Promise<boolean> => { 
    const response = await dao.Create(icollection.accessor, entry); 
    if(response.success) 
      setEntries(icollection.entries); // ?? will it update entries hook propertly ?? 
    setResponse(response); 
    return response.success; 
  } 

  const Update = async (entry:IEntry):Promise<boolean> => { 
    const response = await dao.Update(icollection.accessor, entry); 
    if(response.success) 
      setEntries(icollection.entries); // ?? will it update entries hook propertly ?? 
    setResponse(response); 
    return response.success; 
  }

  const Delete = async (entry:IEntry):Promise<boolean> => { 
    const response = await dao.Delete(icollection.accessor, entry); 
    if(response.success) 
      setEntries(icollection.entries); // ?? will it update entries hook propertly ?? 
    setResponse(response); 
    return response.success; 
  }

  return {entries, response, Create, Update, Delete} as ICrudHook; 
} 

