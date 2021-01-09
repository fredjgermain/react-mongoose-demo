import {useReducer} from 'react'; 
//import axios from 'axios'; 

export interface IState { 
  ready: boolean, 
  success: boolean, 
  response: any, 
} 

interface Action { 
  type: string, 
  payload: any, 
} 

const reducer = (state:IState, action:Action):IState => {
  switch(action.type) { 
    case 'LOAD_SUCCESS': 
      return { 
        ready: true, 
        success: true, 
        response: action.payload, // query response 
      } as IState; 
    case 'LOAD_ERROR': 
      return { 
        ready: true, 
        success: false, 
        response: action.payload, // error message 
      } as IState; 
    default: 
      return state; 
  } 
} 

const init:IState = { 
  ready: false, 
  success: false, 
  response: {}, 
}

interface UseLoader { 
  state:IState; 
  Load:(loadfunc:() => Promise<any>) => Promise<void> 
} 
export function useLoader():UseLoader { 
  const [state, dispatch] = useReducer<(state: IState, action: Action) => IState>(reducer, init); 

  const Load = async (loadfunc:() => Promise<void>) => { 
    await loadfunc().then( res => { 
      dispatch({type:'LOAD_SUCCESS', payload:res} ) 
    }) 
    .catch( err => { 
      dispatch({type:'LOAD_ERROR', payload:err} ) 
    }) 
  } 
  return {state, Load} 
} 