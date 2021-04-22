import {useState} from 'react'; 


export interface ICrudState { 
  row:number|null, 
  mode:string, 
}; 

export interface IUseCrudState { 
  crudState: ICrudState; 
  SetCrudState: (newValue: any) => void; 
  ResetCrudState: () => void; 
} 

export function useCrudState():IUseCrudState{ 
  const initState = {row:null, mode:'read'} as ICrudState; 
  const [crudState, setCrudState] = useState(initState); 
  
  const SetCrudState = (newValue:any) => setCrudState( prev => { 
    return {...prev, ...(newValue as ICrudState)}; 
  }); 
  
  const ResetCrudState = () => SetCrudState(initState) 
  return {crudState: crudState, SetCrudState, ResetCrudState}; 
}