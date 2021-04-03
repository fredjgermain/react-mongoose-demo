import React, { useContext } from 'react'; 
import  { Redirect, useHistory } from 'react-router-dom'; 
import { usePatient, IUsePatient } from './hooks/usepatient.hook'; 

import { PatientProfile } from './components/patientprofile.component'; 
import { PatientFeedback } from './components/patient.feedback'; 
import { Redirection } from '../../components/redirector/redicrector.component';



export const PatientContext = React.createContext({} as IUsePatient); 
export default function PatientPage() { 
  //console.log('patient page'); 
  const context = usePatient(); 
  const {feedbackRef, ready} = context; 

  return <PatientContext.Provider value={context}> 
    <h1>Patient section</h1> 
    <p>Please write down your RAMQ number, then your first and last name, then press 'Save profile' before proceding with the questionnaires.</p>

    <PatientFeedback {...{feedbackRef}}/> 
    <PatientProfile/> 
    <Redirection {...{condition:ready, destination:'questionnaire'}}/> 
  </PatientContext.Provider> 
} 

function QuestionnaireRedirection() { 
  const {ready} = useContext(PatientContext); 
  let history = useHistory(); 
  //<button onClick={() => history.push('/questionnaire')}>Redirect</button>: 
  return <div> 
    <div>{JSON.stringify(history)}</div> 
    {ready ? 
      <Redirect to={"/questionnaire"} />: 
      <p>Not ready ... </p>} 
  </div> 
}



