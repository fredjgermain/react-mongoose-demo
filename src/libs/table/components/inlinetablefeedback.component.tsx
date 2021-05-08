import { useContext } from 'react'; 
import { InlineTableContext } from './inlinetable.component'; 


export function InlineTableFeedback() { 
  const {feedback} = useContext(InlineTableContext); 

  if(!feedback?.data) 
    return <div></div> 

  const abbrev = (feedback.data as IEntry)._id; 
  const label:any = {create:'created', update:'updated', delete:'deleted'}; 
  const actionType = feedback.actionType as string; 

  if(feedback.success) 
    return <div className={'success'}> 
      {abbrev} was successfully {label[actionType]}. 
    </div> 
  return <div className={'failure'}> 
    {abbrev} could not be {label[actionType]}. <br/> 
    <ul className={'warning'}> 
      {feedback.err.map( (err,i) => { 
        return <li key={i}> 
          {err} 
        </li> 
      })} 
    </ul> 
  </div> 
}