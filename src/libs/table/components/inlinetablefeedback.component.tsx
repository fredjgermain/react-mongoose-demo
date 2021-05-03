import { useContext } from 'react'; 
import { DaoContext } from '../../dao/components/dao.contexter'; 
import { InlineTableContext } from '../hooks/useinlinetable.hook'; 


export function InlineTableFeedback({collectionAccessor}:{collectionAccessor:string}) { 
  const {inlineFeedback} = useContext(InlineTableContext); 
  const dao = useContext(DaoContext); 

  if(!inlineFeedback?.data) 
    return <div></div> 

  const abbrevField = dao.GetIFields(collectionAccessor).find(f=>f.isAbbrev); 
  const abbrev = abbrevField ? inlineFeedback.data[abbrevField?.accessor]: ''; 
  const label:any = {create:'created', update:'updated', delete:'deleted'}; 
  const actionType = inlineFeedback.actionType as string; 

  if(inlineFeedback.success) 
    return <div className={'success'}> 
      {abbrev} was successfully {label[actionType]}. 
    </div> 
  return <div className={'failure'}> 
    {abbrev} could not be {label[actionType]}. <br/> 
    <ul className={'warning'}> 
      {inlineFeedback.err.map( (err,i) => { 
        return <li key={i}> 
          {err} 
        </li> 
      })} 
    </ul> 
  </div> 
}