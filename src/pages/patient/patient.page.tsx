import React, {useEffect} from 'react'; 
import {useDao, DaoContexter, ICrud, DataAccessObject} from '../../reusable/_dao'; 
import {CrudMongoose} from '../../reusable/_mongooseparser'; 
import {FeedBack} from '../../components/feedback/feedback.component'; 
import {IsEmpty} from '../../reusable/_utils'; 

import {PatientProfile} from './components/patientprofile.component'; 
//import {RamqIdentification} from './components/ramqidentitication.component';

const crud = new CrudMongoose(`https://fjg-mongoose-heroku.herokuapp.com/api/`); 


// PATIENT PAGE =================================
export function Patient() {
  const UseDao = useDao( new DataAccessObject(crud as ICrud) ); 
  const {state, activeCollection, setActiveCollection, Collections, collections} = UseDao; 

  async function GetPatient() { 
    await Collections(['patients']); 
    const collection = collections().find( c => c.accessor==='patients'); 
    if(collection) 
      setActiveCollection(collection); 
  } 
  
  useEffect(() => { 
    GetPatient(); 
  }, []); 

  return <DaoContexter {...{UseDao}} > 
    <h1>Patient identification</h1> 
    <FeedBack/> 
    {state.ready && state.success && !IsEmpty(activeCollection) && <PatientProfile/>} 
  </DaoContexter> 
}