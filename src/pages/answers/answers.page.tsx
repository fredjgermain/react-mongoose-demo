import React from 'react'; 
import { IsEmpty } from '../../libs/_utils';
import { AnswerTable } from './components/answertable.component'; 
import { AnswersContext, useAnswers } from './hooks/answers.hook'; 
import { PatientSelector } from './components/patientselector.component'; 
import { EmailAnswersBtn } from './components/emailanswersbtn.component'; 


export default function AnswersPage() { 
  const answersContext = useAnswers(); 
  return <AnswersContext.Provider value={answersContext}> 
    <PatientSelector /> 
    {!IsEmpty(answersContext.patient) && <div>
      <AnswerTable /> 
      <EmailAnswersBtn/> 
    </div>} 
  </AnswersContext.Provider> 
}