import React, {useEffect} from 'react'; 
import {useDao, DaoContexter, ICrud, DataAccessObject} from '../../reusable/_dao'; 
import {CrudMongoose} from '../../reusable/_mongooseparser'; 
import {FeedBack} from '../../components/feedback.component'; 
import {IsEmpty} from '../../reusable/_utils'; 

import {CollectionSelector} from './collectionselector.component'; 
import {AdminTablr} from './admintablr.component'; 

import '../../css/table.css'; 

const crud = new CrudMongoose(`https://fjg-mongoose-heroku.herokuapp.com/api/`); 

export function Admin() { 
  const UseDao = useDao( new DataAccessObject(crud as ICrud) ); 
  const {state, activeCollection, Collections} = UseDao; 

  useEffect(() => { 
    Collections(['questions','responses', 'forms', 'instructions', 'patients', 'answers']); 
  }, []); 

  return <DaoContexter {...{UseDao}} > 
    <h1>Admin</h1> 
    <FeedBack/> 
    {state.ready && state.success && <CollectionSelector /> } 
    {!IsEmpty(activeCollection) && <AdminTablr/>} 
  </DaoContexter> 
}



