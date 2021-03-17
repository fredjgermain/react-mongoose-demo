import React, { useContext, useRef, useState } from 'react'; 

import '../../css/feedback.css'; 
import { ToArray } from '../../reusable/_arrayutils'; 
import { IsEmpty } from '../../reusable/_utils'; 



function FeedbackSetter({feedbackRef}:{feedbackRef:React.MutableRefObject<GetSet>}) { 
  return <div> 
    <button onClick={() => feedbackRef.current?.Set([{type:0, msg:'success !!'}] )} >Success</button> <br/> 
    <button onClick={() => feedbackRef.current?.Set([{type:1, msg:'note?'}] )} >Note</button> <br/> 
    <button onClick={() => feedbackRef.current?.Set([{type:2, msg:'warning !!'}] )} >Warning</button> <br/> 
    <button onClick={() => feedbackRef.current?.Set([{type:3, msg:'failure !!'}] )} >Failure</button> <br/> 
  </div> 
}

export function TestFeedback({args}:{args:any}) { 
  const feedbackRef = useRef<GetSet>({} as GetSet);

  return <div>
    <FeedbackComponent {...{feedbackRef}}> 
      <FeedbackLines/> 
    </FeedbackComponent> 

    <FeedbackSetter {...{feedbackRef}} />
  </div> 
}


// Feedback =============================================== 
export type GetSet = { 
  Get: () => any; 
  Set: (newValue:any) => void; 
}

export const FeedbackContext = React.createContext({} as GetSet); 
export function FeedbackComponent( {feedbackRef, children}:React.PropsWithChildren<{feedbackRef:React.MutableRefObject<GetSet>}> ) { 
  console.log('component'); 
  const [value, setValue] = useState({} as any); 

  feedbackRef.current.Get = () => value; 
  feedbackRef.current.Set = (newValue:any) => setValue(newValue); 


  return <FeedbackContext.Provider value={{Get:() => value, Set:(newValue:any) => setValue(newValue)}}> 
    {children} 
    <div>Set feedback: {JSON.stringify(feedbackRef.current.Get())}</div> 
  </FeedbackContext.Provider> 
} 

type FeedbackLine = {type:number, msg:string} 
export function FeedbackLines() { 
  console.log('Feedbacklines'); 
  const {Get} = useContext(FeedbackContext); 
  const value:FeedbackLine[] = IsEmpty(Get()) ? [] : ToArray(Get()); 
  const classNames = ['success', 'note', 'warning', 'failure']; 

  return <ul> 
    {value.map( (feedback,i) => { 
      return <li key={i} className={classNames[feedback.type]}>{feedback.msg}</li> 
    })} 
  </ul> 
} 


/// ######################################################


export function TestParentChild({args}:{args:any}) { 
  const _ref = useRef<GetSet>({} as GetSet); 

  return <div> 
    <Parent {...{_ref}} > 
      <Child /> 
    </Parent> 
    <button onClick={() => _ref.current.Set(_ref.current.Get()+1)}>+1</button> 
    <button onClick={() => _ref.current.Set(_ref.current.Get()-1)}>-1</button> 
  </div>
}

function Setter({setValue}:{setValue:(newValue:any) => void}) { 

  return <div> 
    <button onClick={() => setValue((prev:any) => prev+1)}>+1</button> 
    <button onClick={() => setValue((prev:any) => prev-1)}>-1</button> 
  </div>
}

const ParentContext = React.createContext({} as {value:number, setValue:React.Dispatch<React.SetStateAction<number>>});

function Parent({_ref, children}:React.PropsWithChildren<{_ref:React.MutableRefObject<GetSet>}>) { 
  const [value, setValue] = useState(0 as number); 

  _ref.current.Get = () => value; 
  _ref.current.Set = (newValue:any) => setValue(newValue); 

  return <div>
    <ParentContext.Provider value={{value, setValue}}> 
      value from parent {value} <br/> 
      {children} 
    </ParentContext.Provider> 
    <Setter {...{setValue}}/> 
  </div>
}

function Child() { 
  const {value} = useContext(ParentContext); 
  return <div>value from child {value}</div> 
} 
