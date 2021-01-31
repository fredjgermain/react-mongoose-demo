import React, {useContext, useState} from 'react'; 
import {PatientProfileContext} from '../patient/patient.page'; 
import {LoadQuestionnaire} from './components/loadquestionnaire.component'; 
import {IsEmpty} from '../../reusable/_utils'; 
import {DisplayQuestions} from './components/displayquestion.component'; 


interface IAnswersContext { 
  answers: IAnswer[]; 
  setAnswers: React.Dispatch<IAnswer[]>; 
} 
export const AnswersContext = React.createContext({} as IAnswersContext); 
// Questionnaire ================================ 
export function Questionnaire() { 
  const {patientProfile} = useContext(PatientProfileContext); 
  const [answers, setAnswers] = useState([] as IAnswer[]); 

  const context = {answers, setAnswers}; 
  return <AnswersContext.Provider value={context}> 
    <h1>Patient questionnaire</h1> 
    <div>patient: {JSON.stringify(patientProfile['ramq'])}</div> 
    <h2>Questionnaire form ...</h2> 
    {IsEmpty(answers) && <LoadQuestionnaire/>} 
    {!IsEmpty(answers) && <DisplayQuestions/>} 
  </AnswersContext.Provider> 
} 
