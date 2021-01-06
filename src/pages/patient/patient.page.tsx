import React, {useState} from 'react'; 
import {CrudMongoose} from '../../reusable/mongooseparser/_mongooseparser'; 
import {IsNull, IsEmpty} from '../../reusable/utils/_utils'; 

import {PatientHeader} from './components/patientheader.component'; 
import {PatientsLoader} from './components/patientsloader.component'; 
import {PatientIdentifier} from './components/patientidentifier.component'; 
import {PatientInfos} from './components/patientinfos.component'; 

import {QuestionnaireLoader} from './components/questionnaireloader.component'; 
import {Questionnaire} from './components/questionnaire.component'; 

export const crud = new CrudMongoose(`https://fjg-mongoose-heroku.herokuapp.com/api/`); 


interface IPatientContext { 
  patients:ICollection; 
  setPatients:any; 

  patient:IEntry; 
  setPatient:any; 

  questions:ICollection; 
  setQuestions:any; 

  patientUpdated:boolean; 
  setPatientUpdated:any; 
} 
// PATIENT ======================================
export const PatientContext = React.createContext({} as IPatientContext); 
export default function Patient() { 
  const [patient, setPatient] = useState({}); 
  const [patientUpdated, setPatientUpdated] = useState(false); 
  const [patients, setPatients] = useState({} as ICollection); 
  const [questions, setQuestions] = useState({} as ICollection); 

  //<RamqIdentification/> ?? <PatientInfos/>} 

  const context = {patients, setPatients, 
    patient, setPatient, 
    questions, setQuestions, 
    patientUpdated, setPatientUpdated} as IPatientContext; 

  return <div> 
    <PatientContext.Provider value={context} > 
      <PatientHeader /> 
      {!patientUpdated && IsEmpty(patients) && <PatientsLoader/>} 
      {!patientUpdated && !IsEmpty(patients) && IsEmpty(patient) && <PatientIdentifier/>} 
      {!patientUpdated && !IsEmpty(patients) && !IsEmpty(patient) && <PatientInfos/>} 

      {patientUpdated && IsEmpty(questions) && <QuestionnaireLoader/>} 
      {patientUpdated && !IsEmpty(questions) && <Questionnaire/>} 
    </PatientContext.Provider> 
  </div> 
} 


