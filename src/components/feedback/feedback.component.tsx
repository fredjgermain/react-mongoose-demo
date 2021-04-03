import React, { useState } from 'react'; 

import '../../css/main.css'; 
import { ToArray } from '../../reusable/_arrayutils'; 
import { IsEmpty } from '../../reusable/_utils'; 


// Feedback =============================================== 
export type GetSet = { 
  Get: () => any; 
  Set: (newValue:any) => void; 
} 


export function useRefGetSet(feedbackRef:React.MutableRefObject<GetSet>) { 
  const [value, setValue] = useState({} as any); 
  feedbackRef.current = {
    Get: () => value, 
    Set: (newValue:any) => setValue(newValue), 
  }
  const Get = () => value; 
  const Set = (newValue:any) => setValue(newValue); 
  return {Get, Set} 
} 


export function TestFeedback({feedbackRef}:{feedbackRef:React.MutableRefObject<GetSet>}) { 
  const {Get} = useRefGetSet(feedbackRef); 
  return <div> 
    {JSON.stringify(Get())} 
  </div> 
} 


type FeedbackLine = {type:number, msg:string} 
export function FeedbackLines({feedbackRef}:{feedbackRef:React.MutableRefObject<GetSet>}) { 
  const {Get} = useRefGetSet(feedbackRef);  
  const value:FeedbackLine[] = IsEmpty(Get()) ? [] : ToArray(Get()); 
  const classNames = ['success', 'note', 'warning', 'failure']; 

  return <ul> 
    {value.map( (feedback,i) => { 
      return <li key={i} className={classNames[feedback.type]}>{feedback.msg}</li> 
    })} 
  </ul> 
} 





// export const FeedbackContext = React.createContext({} as GetSet); 
// export function FeedbackComponent( {feedbackRef, children}:React.PropsWithChildren<{feedbackRef:React.MutableRefObject<GetSet>}> ) { 
//   console.log('component'); 
//   const context = useRefGetSet(feedbackRef); 
//   return <FeedbackContext.Provider value={context}> 
//     {children} 
//     <div>Set feedback: {JSON.stringify(feedbackRef.current.Get())}</div> 
//   </FeedbackContext.Provider> 
// } 



