import React, { useContext, useRef } from 'react'; 
import { TestParentChild, FeedbackComponent, FeedbackLines, GetSet } from './feedback.component'; 
import { FeedbackCruds } from './feedbackcrud.component'; 



function FeedbackSetter({feedbackRef}:{feedbackRef:React.MutableRefObject<GetSet>}) { 
  return <div> 
    <button onClick={() => feedbackRef.current?.Set([{type:0, msg:'success !!'}] )} >Success</button> <br/> 
    <button onClick={() => feedbackRef.current?.Set([{type:1, msg:'note?'}] )} >Note</button> <br/> 
    <button onClick={() => feedbackRef.current?.Set([{type:2, msg:'warning !!'}] )} >Warning</button> <br/> 
    <button onClick={() => feedbackRef.current?.Set([{type:3, msg:'failure !!'}] )} >Failure</button> <br/> 
  </div> 
}

function FeedbackCrudSetter({feedbackRef}:{feedbackRef:React.MutableRefObject<GetSet>}) { 
  const responses = [{actionType: 'create', success:true, data:{}, err:[]}]; 
  const responses2 = [{actionType: 'update', success:true, data:{}, err:[]}]; 
  const responses3 = [{actionType: 'delete', success:true, data:{}, err:[]}]; 
  return <div> 
    <button onClick={() => feedbackRef.current?.Set(responses)} >Success</button> <br/> 
    <button onClick={() => feedbackRef.current?.Set(responses2)} >Success</button> <br/> 
    <button onClick={() => feedbackRef.current?.Set(responses3)} >Success</button> <br/> 
  </div> 
}


function TestFeedbackStory({...props}:{child:any, setter:any}) { 
  const feedbackRef = useRef<GetSet>({} as GetSet); 
  
  return <div>
    <FeedbackComponent {...{feedbackRef}}> 
      <props.child/> 
    </FeedbackComponent> 
    <props.setter {...{feedbackRef}} /> 
  </div> 
}


export default { 
  title: 'Feedback', 
  component: TestFeedbackStory, 
} 


/*const Template = args => <TestParentChild {...args} /> 
export const Test_ParentChild = Template.bind({}) 
Test_ParentChild.args = {}*/

const Template = args => <TestFeedbackStory {...args} /> 

export const TestFeedbackLines = Template.bind({}) 
TestFeedbackLines.args = { 
  child: FeedbackLines, 
  setter: FeedbackSetter 
} 

export const TestFeedbackCrud = Template.bind({}) 
TestFeedbackCrud.args = { 
  child: FeedbackCruds, 
  setter: FeedbackCrudSetter 
} 

/*
function FeedbackSetter({feedbackRef}:{feedbackRef:React.MutableRefObject<GetSet>}) { 
  return <div> 
    <button onClick={() => feedbackRef.current?.Set([{type:0, msg:'success !!'}] )} >Success</button> <br/> 
    <button onClick={() => feedbackRef.current?.Set([{type:1, msg:'note?'}] )} >Note</button> <br/> 
    <button onClick={() => feedbackRef.current?.Set([{type:2, msg:'warning !!'}] )} >Warning</button> <br/> 
    <button onClick={() => feedbackRef.current?.Set([{type:3, msg:'failure !!'}] )} >Failure</button> <br/> 
  </div> 
} 

function FeedbackTemplate({...props}:{args:any, feedbackchild: any, feedbacksetter: any}) { 
  const feedbackRef = useRef<GetSet>({} as GetSet); 

  return <div> 
    <FeedbackComponent {...{feedbackRef}} > 
      {props.feedbackchild} 
    </FeedbackComponent> <br/> 
    <props.feedbacksetter {...{feedbackRef}} /> 
  </div> 
} 

const Template = args => <FeedbackTemplate {...args} /> 

export const Feedback_Lines = Template.bind({}) 
Feedback_Lines.args = { 
  feedbackchild: <FeedbackLines/>, 
  feedbacksetter: FeedbackSetter
} 

/*export const Feedback_Crud = Template.bind({}) 
Feedback_Crud.args = { 
  children: <
}*/
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