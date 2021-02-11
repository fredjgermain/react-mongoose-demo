import {useReducer} from 'react'; 



export interface IState { 
  busy: boolean, 
  success: boolean, 
  response: any, 
} 

interface Action { 
  type: string, 
  payload: any, 
} 

const reducer = (state:IState, action:Action):IState => {
  switch(action.type) { 
    case 'IS_BUSY' : { 
      return { 
        busy: true, 
        success: false, 
        response: action.payload, // query response 
      } as IState; 
    } 

    case 'LOAD_SUCCESS': 
      return { 
        busy: false, 
        success: true, 
        response: action.payload, // query response 
      } as IState; 
    case 'LOAD_ERROR': 
      return { 
        busy: false, 
        success: false, 
        response: action.payload, // error message 
      } as IState; 
    default: 
      return state; 
  } 
} 

const init:IState = { 
  busy: false, 
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
    // Loader is busy 
    dispatch({type:'IS_BUSY', payload:undefined}) 

    // Loader has finished
    await loadfunc().then( res => { 
      dispatch({type:'LOAD_SUCCESS', payload:res} ) 
    }) 
    .catch( err => { 
      dispatch({type:'LOAD_ERROR', payload:err} ) 
    })  
  } 
  return {state, Load}; 
} 
