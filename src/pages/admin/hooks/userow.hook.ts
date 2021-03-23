import { useContext } from 'react'; 
//import { DaoContext } from '../../../reusable/_dao'; 
import { AdminContext } from '../admin.page'; 
import { useIEntry, IUseIEntry } from '../../../reusable/_customhooks'; 
import { IEditor } from '../../../components/editor_reader/_editor_reader'; 


export interface IUseRow extends IUseIEntry{ 
  index:number; 
  editMode: string; 
  columnsArgs: IEditor[]; 

  Get: (keys?: TKey[] | undefined) => any; 
  Set: (newValue: any, keys?: TKey[] | undefined) => void; 

  CreateUpdateEntry: () => Promise<void>; 
  DeleteEntry: () => Promise<void>; 
} 

// useEntry ===============================================
export function useRow(index:number):IUseRow { 
  //const dao = useContext(DaoContext); 
  const {dao, columns, collectionAccessor, GetEditingMode, SetEditingMode, feedbackRef} = useContext(AdminContext); 
  const useientry = useIEntry(collectionAccessor, index); 
  
  // Entry Hook ............................................
  const {Get, Set} = useientry; 
  const editMode = GetEditingMode(index); 
  const entry = Get(); 
  const columnsArgs = useientry.GetIEditorArgs(columns); 

  // CreateUpdateEntry .................................... 
  async function CreateUpdateEntry() { 
    const [response] = await dao.CreateUpdate(collectionAccessor, [entry]); 
    feedbackRef.current.Set([response]); 
    if(response.actionType === 'create') 
      Set(dao.GetDefaultIEntry(collectionAccessor)) 
    // Reset after editing state
    SetEditingMode(); 
  } 

  // DeleteEntry .......................................... 
  async function DeleteEntry() { 
    const [response] = await dao.Delete(collectionAccessor, [entry]); 
    feedbackRef.current.Set([response]); 
    // Reset after editing state
    SetEditingMode(); 
  } 
  
  return {editMode, columnsArgs, CreateUpdateEntry, DeleteEntry, ...useientry}; 
}
