import React, {useEffect} from 'react'; 
import {useDao, DaoContexter, ICrud, DAO} from '../../reusable/_dao'; 
import {CrudMongoose} from '../../reusable/_mongooseparser'; 
import {FeedBack} from '../../components/feedback/feedback.component'; 
import {IsEmpty} from '../../reusable/_utils'; 

import {CollectionSelector} from './components/collectionselector.component'; 
import {AdminTablr} from './components/admintablr.component'; 

import '../../css/table.css'; 

const crud = new CrudMongoose(`https://fjg-mongoose-heroku.herokuapp.com/api/`); 


// ADMIN PAGE ====================================
export function Admin() { 
  // new RegExp(regex).test(value) 
  /*console.log(RegexValidation('', '^[a-zA-Z]{4}[0-9]{8}$')); 
  console.log(RegexValidation('caca', '^[a-zA-Z]{4}[0-9]{8}$')); 
  console.log(RegexValidation('JEAF23118301', '^[a-zA-Z]{4}[0-9]{8}$')); */
  
  const UseDao = useDao( new DAO(crud as ICrud) ); 
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


