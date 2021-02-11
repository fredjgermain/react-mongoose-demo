import React, {useContext, useEffect, useState} from 'react'; 
import {IsEmpty, GetValueAt, SetValueAt} from '../../reusable/_utils'; 
import {PatientId} from './components/patientid.component'; 
import {PatientProfile} from './components/patientprofile.component'; 
import {Questionnaire} from '../questionnaire/questionnaire.page'; 
import {useCollectionLoader} from '../../components/predloader.component';
import {CrudContext} from '../../reusable/_crud'; 
//import {RamqIdentification} from './components/ramqidentitication.component';


/* Use Patient ============================================
Load necessary collections
set active collection to the patient collection
*/
function usePatient() { 
  const {activeCollection, setActiveCollection, GetICollections} = useContext(CrudContext); 
  const ready = useCollectionLoader(['patients', 'answers']); 
  const [patientProfile, setPatientProfile] = useState({} as IEntry); 

  useEffect(() => { 
    const [patients] = GetICollections(['patients']); 
    if(patients) 
      setActiveCollection(patients); 
  }, [ready && activeCollection?.accessor !== 'patients']); 

  return {ready, patientProfile, setPatientProfile}; 
}


interface IPatientProfileContext { 
  patientProfile: IEntry; 
  setPatientProfile: React.Dispatch<IEntry>; 
} 
export const PatientProfileContext = React.createContext({} as IPatientProfileContext); 
// PATIENT PAGE =================================
export default function Patient() { 
  const {activeCollection, activeEntry, activeMode} = useContext(CrudContext); 
  const {ready, patientProfile, setPatientProfile} = usePatient(); 
  const context = {patientProfile, setPatientProfile}; 

  return <PatientProfileContext.Provider value={context}> 
    {!IsEmpty(activeCollection) && IsEmpty(activeEntry) && <PatientId/>} <br/>
    {!IsEmpty(activeCollection) && !IsEmpty(activeEntry) && IsEmpty(patientProfile) && <PatientProfile/>} <br/>
    {!IsEmpty(activeCollection) && !IsEmpty(activeEntry) && !IsEmpty(patientProfile) && <Questionnaire/>} <br/>
  </PatientProfileContext.Provider> 
} 

/*
{!IsEmpty(activeCollection) && IsEmpty(patientProfile) && <PatientProfile/>} 
      
*/