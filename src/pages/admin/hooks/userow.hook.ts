import { useContext } from 'react'; 
import { DaoContext } from '../../../reusable/_dao'; 
import { AdminContext } from '../admin.page'; 
import { useIEntry, IUseIEntry } from '../../../reusable/_customhooks'; 
import { feedback } from '../../../components/feedback/feedback.component'; 
import { IEditor } from '../../../reusable/_input'; 


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
  const {GetDefaultIEntry, CreateUpdate, Delete} = useContext(DaoContext); 
  const {columns, collectionAccessor, GetEditingMode, SetEditingMode} = useContext(AdminContext); 
  const useientry = useIEntry(collectionAccessor, index); 
  
  // Entry Hook ............................................
  const {Get, Set} = useientry; 
  const editMode = GetEditingMode(index); 
  const entry = Get(); 
  const columnsArgs = useientry.GetIEditorArgs(columns); 

  // CreateUpdateEntry .................................... 
  async function CreateUpdateEntry() { 
    const [response] = await CreateUpdate(collectionAccessor, [entry]); 
    feedback.setValue([response]); 
    if(response.actionType === 'create') 
      Set(GetDefaultIEntry(collectionAccessor)) 
    // Reset after editing state
    SetEditingMode(); 
  } 

  // DeleteEntry .......................................... 
  async function DeleteEntry() { 
    const [response] = await Delete(collectionAccessor, [entry]); 
    feedback.setValue([response]); 
    // Reset after editing state
    SetEditingMode(); 
  } 
  
  return {editMode, columnsArgs, CreateUpdateEntry, DeleteEntry, ...useientry}; 
}