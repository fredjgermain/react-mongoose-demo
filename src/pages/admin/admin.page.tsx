import React, { useEffect, useState, useContext } from 'react'; 
/*import {DataAccessObject, ICrud, IUseDao, useDao} from '../../reusable/dao/_dao'; 
import {CrudMongoose} from '../../reusable/mongooseparser/mongooseaxios'; 
import {IsEmpty, IsNull} from '../../reusable/utils/_utils'; 

import {SelectCollection} from './components/selectcollection.component'; 
import {AdminTablr} from './components/admintablr.component'; 

const crud = new CrudMongoose(`https://fjg-mongoose-heroku.herokuapp.com/api/`); 



// Test DAO ===================================== 
export const DaoContext = React.createContext({} as IUseDao); 
export default function Admin() { 
  const context = useDao(new DataAccessObject(crud as ICrud)); 
  const {state, activeCollection, Collections} = context; 

  useEffect(() => { 
    Collections(['questions', 'responses', 'forms', 'instructions', 'patients', 'answers']); 
  }, []); 

  // Render -------------------------------------
  return <div> 
    <h1>ADMIN PAGE</h1> 
    <div> 
    <DaoContext.Provider value={context} > 
      <FeedBack /> 
      {state.ready && <SelectCollection />} 
      {!IsEmpty(activeCollection) && <AdminTablr />} 
    </DaoContext.Provider> 
    </div> 
  </div> 
}


function FeedBack() { 
  const {state} = useContext(DaoContext); 

  return <div> 
    {!state.ready && 'Loading'} 
    {state.ready && 'Ready'} 
    {state.success && JSON.stringify(state.response['success'])} 
    {!state.success && 'an errors occured'} 
  </div> 
}*/