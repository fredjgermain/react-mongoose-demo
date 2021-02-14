import {useState, useContext} from 'react';
import {PatientContext} from '../../patient/patient.page'; 

export function useQuestionnaire() { 
  const {patientProfile} = useContext(PatientContext); 
  const [answers, setAnswers] = useState([] as IAnswer[]); 


  return 
} 