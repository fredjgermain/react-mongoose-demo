import { useContext, useEffect } from 'react'; 
import { Select, Options } from '../../../reusable/components/input/_input'; 
import { DaoContext } from '../../../reusable/dao/_dao'; 
import { FeedBack } from '../../../components/feedback.component'; 
import { CrudTablr } from './crudtablr.component';
import { IsEmpty } from '../../../reusable/utils/_utils';


// SELECT COLLECTION ============================
export function LoadSelectionCollection () { 
  const {state, activeCollection, setActiveCollection, collections, Collections} = useContext(DaoContext); 
  const options:IOption[] = collections().map( ic => { return {value:ic, label:ic.label} }); 

  useEffect(() => { 
    Collections(['questions','responses', 'forms', 'instructions', 'patients', 'answers']); 
  }, []); 
  
  return <div> 
    <FeedBack/> 
    {state.ready && state.success && 
      <Select {...{value:activeCollection, setValue:setActiveCollection}} > 
        <Options {...{options}} /> 
      </Select> }
    {state.ready && state.success && !IsEmpty(activeCollection) && <CrudTablr/> } 
  </div>
} 