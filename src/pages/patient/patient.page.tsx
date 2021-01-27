import React, {useContext, useEffect, useState} from 'react'; 
import {useDao, DaoContexter, ICrud, DataAccessObject, DaoContext} from '../../reusable/_dao'; 
import {CrudMongoose} from '../../reusable/_mongooseparser'; 
import {IsEmpty} from '../../reusable/_utils'; 
import {PatientProfile} from './components/patientprofile.component'; 
import {Questionnaire} from '../questionnaire/questionnaire.page'; 
import {LoadPatients } from './components/loadpatient.component'; 
//import {RamqIdentification} from './components/ramqidentitication.component';

const crud = new CrudMongoose(`https://fjg-mongoose-heroku.herokuapp.com/api/`); 




// PATIENT PAGE =================================
interface IPatientProfileContext { 
  patientProfile: IEntry; 
  setPatientProfile: React.Dispatch<IEntry>; 
} 
export const PatientProfileContext = React.createContext({} as IPatientProfileContext); 
export function Patient() { 
  const UseDao = useDao( new DataAccessObject(crud as ICrud) ); 
  const {activeCollection} = UseDao; 
  const [patientProfile, setPatientProfile] = useState({} as IEntry); 

  const context = {patientProfile, setPatientProfile}; 
  return <DaoContexter {...{UseDao}} > 
    <PatientProfileContext.Provider value={context} > 
      {IsEmpty(activeCollection) && <LoadPatients/>} 
      {!IsEmpty(activeCollection) && IsEmpty(patientProfile) && <PatientProfile/>} 
      {!IsEmpty(patientProfile) && <Questionnaire/>} 
    </PatientProfileContext.Provider> 
  </DaoContexter> 
} 
