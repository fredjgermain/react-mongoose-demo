import React from 'react'; 
import { IsEmpty } from '../../libs/_utils';
import { AnswerTable } from './components/answertable.component'; 
import { AnswersContext, useAnswers } from './hooks/answers.hook'; 
import { PatientSelector } from './components/patientselector.component'; 
import { RoundBox } from '../../components/roundbox.component'; 

export default function AnswersPage() { 
  const answersContext = useAnswers(); 
  return <AnswersContext.Provider value={answersContext}> 
    <h1>Answers section</h1> 
    <RoundBox>
      <PatientSelector /> 
      <ul> 
        <li>Select a patient by its RAMQ to display this patients's answers.</li> 
      </ul> 
    </RoundBox>

    {!IsEmpty(answersContext.patient) && <AnswerTable />} 
  </AnswersContext.Provider> 
}