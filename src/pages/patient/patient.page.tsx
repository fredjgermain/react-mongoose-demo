import React, {useContext, useEffect, useState} from 'react'; 
import {IsEmpty, GetValueAt, SetValueAt} from '../../reusable/_utils'; 
import {PatientProfile} from './components/patientprofile.component'; 
import {Questionnaire} from '../questionnaire/questionnaire.page'; 
import {LoadPatients } from './components/loadpatient.component'; 
import { CrudContext } from '../../reusable/_crud';
//import {RamqIdentification} from './components/ramqidentitication.component';



// PATIENT PAGE =================================
interface IPatientProfileContext { 
  patientProfile: IEntry; 
  setPatientProfile: React.Dispatch<IEntry>; 
} 
export const PatientProfileContext = React.createContext({} as IPatientProfileContext); 
export default function Patient() { 
  const {activeCollection, setActiveCollection, GetICollections} = useContext(CrudContext); 
  const [patientProfile, setPatientProfile] = useState({} as IEntry); 


  useEffect(() => {
    if(activeCollection.accessor !== 'patients') { 
      const [patients] = GetICollections(['patients']); 
      if(patients) 
        setActiveCollection(patients); 
    } 
  }, [activeCollection]); 

  const context = {patientProfile, setPatientProfile}; 
  return <PatientProfileContext.Provider value={context} > 
    <h2>Patient</h2>
    {activeCollection.accessor}
  </PatientProfileContext.Provider> 
} 

/*
{!IsEmpty(activeCollection) && IsEmpty(patientProfile) && <PatientProfile/>} 
      {!IsEmpty(patientProfile) && <Questionnaire/>} 
*/