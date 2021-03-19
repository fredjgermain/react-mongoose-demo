import React, { useRef } from 'react'; 
import { TestFeedback, FeedbackLines, GetSet } from './feedback.component'; 
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
    <button onClick={() => feedbackRef.current?.Set(responses)} >Create</button> <br/> 
    <button onClick={() => feedbackRef.current?.Set(responses2)} >Update</button> <br/> 
    <button onClick={() => feedbackRef.current?.Set(responses3)} >Delete</button> <br/> 
  </div> 
}


/*function TestFeedbackStory({...props}:{child:any, setter:any}) { 
  const feedbackRef = useRef<GetSet>(); 
  
  return <div>
    <FeedbackComponent {...{feedbackRef}}> 
      <props.child/> 
    </FeedbackComponent> 
    <props.setter {...{feedbackRef}} /> 
  </div> 
}*/

function TestFeedbackStory({...props}:{child:any, setter:any}) { 
  const feedbackRef = useRef<GetSet>(); 
  return <div> 
    <props.child {...{feedbackRef}} /> 
    <props.setter {...{feedbackRef}} /> 
  </div> 
} 


export default { 
  title: 'Feedback', 
  component: TestFeedbackStory, 
} 

const Template = args => <TestFeedbackStory {...args} /> 

export const TestFeedbackSingleLine = Template.bind({}) 
TestFeedbackSingleLine.args = { 
  child: TestFeedback, 
  setter: FeedbackSetter 
} 

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
