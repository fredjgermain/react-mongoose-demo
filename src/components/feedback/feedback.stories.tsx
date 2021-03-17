import React, {useRef, useState } from 'react'; 
import FeedbackObj, { FeedbackHook, FeedbackComponent, useFeedback, FeedbackLines } from './feedback.component'; 
import InputArray from '../inputarray/inputarray.component'; 


export default { 
  title: 'Input/Feedback', 
  component: FeedbackComponent, 
} 


type GetSetFeedback = { 
  getFeedbacks: () => any; 
  setFeedbacks: (newValue:any) => void; 
}

function TestFeedback() { 
  const feedbackref = useRef<GetSetFeedback>({} as GetSetFeedback); 
  //const feedbackref = useFeedback(); 

  return <div> 
    <FeedbackComponent {...{feedbackref}} >
      <FeedbackLines/> 
    </FeedbackComponent> <br/> 
    <button onClick={() => feedbackref.current?.setFeedbacks([{type:0, msg:'success !!'}] )} >Success</button> <br/> 
    <button onClick={() => feedbackref.current?.setFeedbacks([{type:1, msg:'note?'}] )} >Note</button> <br/> 
    <button onClick={() => feedbackref.current?.setFeedbacks([{type:2, msg:'warning !!'}] )} >Warning</button> <br/> 
    <button onClick={() => feedbackref.current?.setFeedbacks([{type:3, msg:'failure !!'}] )} >Failure</button> <br/> 

  </div> 
} 

const Template = args => <TestFeedback {...args} /> 

export const Feedback_first = Template.bind({}) 
Feedback_first.args = {} 


/*
function TestFeedback({args}:any) { 
  const [_values, _setValues] = useState([]); 
  const ref = useRef<FeedbackHook>(null); 

  const _onChange = (newValue:any[]) => { 
    _setValues(newValue); 
    const toFeedback = newValue.map( (msg,i) => { 
      return {type:i, msg}; 
    }); 
    ref.current.setFeedbacks(toFeedback); 
  } 

  return <div> 
    <div>
      Feedback ----------------
      <FeedbackObj _ref={ref} /> 
      -------------------------
    </div>
    <InputArray {...{_type:'string', _values, _onChange, _defaultValue:''}} /> 
  </div>
}*/ 

/*
const Template = args => <TestFeedback {...args} /> 

export const Feedback_first = Template.bind({}) 
Feedback_first.args = { 
  _type: 'string', 
  _value:'a string', 
  _defaultValue: '', 
  _onChange: (newValue:any) => console.log(newValue), 
} 
*/