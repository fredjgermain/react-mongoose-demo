import React, {useState} from 'react'; 
import {CrudMongoose} from '../../reusable/mongooseparser/_mongooseparser'; 
import {IsNull, IsEmpty} from '../../reusable/utils/_utils'; 

import {PatientHeader} from './components/patientheader.component'; 
import {PatientsLoader} from './components/patientsloader.component'; 
import {PatientIdentifier} from './components/patientidentifier.component'; 
import {PatientInfos} from './components/patientinfos.component'; 
import QuestionnairePage from '../questionnaire/questionnairepage.page';

/*import {QuestionnaireLoader} from './components/questionnaireloader.component'; 
import {Questionnaire} from './components/questionnaire.component'; */

interface IPatientContext { 
  patients:ICollection; 
  setPatients:any; 

  patient:IEntry; 
  setPatient:any; 

  patientUpdated:boolean; 
  setPatientUpdated:any; 
} 
// PATIENT ======================================
export const PatientContext = React.createContext({} as IPatientContext); 
export const CrudContext = React.createContext({} as {crud:CrudMongoose});

export default function Patient() { 
  const crud = new CrudMongoose(`https://fjg-mongoose-heroku.herokuapp.com/api/`); 
  const [patient, setPatient] = useState<IEntry>({} as IEntry); 
  const [patientUpdated, setPatientUpdated] = useState(false); 
  const [patients, setPatients] = useState({} as ICollection); 
  
  const context = {crud, patients, setPatients, 
    patient, setPatient, 
    patientUpdated, setPatientUpdated} as IPatientContext; 

  if(!patientUpdated) 
    return <div> 
      <CrudContext.Provider value={{crud}} >
        <PatientContext.Provider value={context} > 
          <PatientHeader /> 
          {IsEmpty(patients) && <PatientsLoader/>} 
          {!IsEmpty(patients) && IsEmpty(patient) && <PatientIdentifier/>} 
          {!IsEmpty(patients) && !IsEmpty(patient) && <PatientInfos/>} 
        </PatientContext.Provider> 
      </CrudContext.Provider>
    </div> 

  return <div> 
    <CrudContext.Provider value={{crud}} >
      <PatientContext.Provider value={context} > 
        <QuestionnairePage/> 
      </PatientContext.Provider> 
    </CrudContext.Provider>
  </div>  
} 


