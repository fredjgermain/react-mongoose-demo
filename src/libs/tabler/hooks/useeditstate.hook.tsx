import {useState} from 'react'; 


export interface IEditState { 
  row:number|null, 
  mode:string, 
}; 

export interface IUseEditState {
  editState: IEditState;
  SetEditState: (newValue: IEditState) => void;
}

export function useEditState():IUseEditState{ 
  const initState = {row:null, mode:'read'} as IEditState; 
  const [editState, setEditState] = useState(initState); 
  const SetEditState = (newValue:IEditState) => setEditState(newValue); 
  return {editState, SetEditState}; 
}