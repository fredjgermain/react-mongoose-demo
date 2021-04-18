import { useStateAt } from '../../../libs/_customhooks'; 


export interface IUseEditState { 
  GetEditState: (keys?: TKey[] | undefined) => any; 
  SetEditState: (newValue: any, keys?: TKey[] | undefined) => void; 
  GetEditingMode: (index?: number | undefined) => string; 
  SetEditingMode: (index?: number | undefined, mode?: string | undefined) => void; 
} 


// useEditingState ===========================================
// editIndex is either null or number from -1 and above. 
// -1 means the inline create is active. 
export function useEditState() { 
  const resetState = {collection:'', index:null, mode:'read'}; 
  const [GetEditState, SetEditState] = useStateAt(resetState); 
  const collection = GetEditState(['collection']) as string; 

  function GetEditingMode(index?:number):string { 
    if(index === GetEditState(['index'])) 
      return GetEditState(['mode']); 
    return 'read'; 
  } 

  function SetEditingMode(index?:number, mode?:string) { 
    const newState = {collection, index:index ?? null, mode:mode ?? 'read'} 
    SetEditState(newState); 
  } 

  return { GetEditState, SetEditState, GetEditingMode, SetEditingMode }
}