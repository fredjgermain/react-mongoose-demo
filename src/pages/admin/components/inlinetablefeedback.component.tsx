import { useContext } from 'react';
import { DaoContext } from '../../../libs/_dao'; 
import { AdminContext } from '../hooks/admin.hook'; 


export function InlineTableFeedback() { 
  const dao = useContext(DaoContext); 
  const {collection, feedback} = useContext(AdminContext); 

  if(!feedback?.data) 
    return <div></div> 
  
  const ifield = dao.GetIFields(collection).find( f => f.isAbbrev); 
  const abbrevValue = (feedback.data as any)[ifield?.accessor ?? '_id']; 

  const label:any = {create:'created', update:'updated', delete:'deleted'}; 
  const actionType = feedback.actionType as string; 

  if(feedback.success) 
    return <div className={'success'}> 
      {abbrevValue} was successfully {label[actionType]}. 
    </div> 
  return <div className={'failure'}> 
    {abbrevValue} could not be {label[actionType]}. <br/> 
    <ul className={'warning'}> 
      {feedback.err.map( (err,i) => { 
        return <li key={i}> 
          {err} 
        </li> 
      })} 
    </ul> 
  </div> 
}