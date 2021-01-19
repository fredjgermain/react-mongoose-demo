import React from 'react'; 
import {DaoContexter} from '../../reusable/dao/_dao'; 
import {LoadSelectionCollection} from './components/loadselectcollection.component'; 


// ADMIN SECTION ================================
export function AdminSection() {
  const baseUrl = `https://fjg-mongoose-heroku.herokuapp.com/api/`; 

  return <div> 
    <h1>Admin section</h1> 
    <DaoContexter {...{baseUrl}}> 
      <LoadSelectionCollection/> 
    </DaoContexter> 
  </div> 
}

/*function LoadAdminCollection() {
  const {state, activeCollection, setActiveCollection, collections, Collections} = useContext(DaoContext); 
  const options:IOption[] = collections().map( ic => { return {value:ic, label:ic.label} }); 

  useEffect(() => { 
    Collections(['questions','responses', 'forms', 'instructions', 'patients', 'answers']); 
  }, []); 

  <div> 
    <FeedBack/> 
    {state.ready && state.success && 
      <Select {...{value:activeCollection, setValue:setActiveCollection}} > 
        <Options {...{options}} /> 
      </Select> }
  </div>
}*/


