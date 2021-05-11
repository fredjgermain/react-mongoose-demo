import React, { useContext } from 'react'; 
import { Editor } from '../../../libs/editor_reader/_editor_reader'; 
import { DaoContext } from '../../../libs/_dao'; 
import { AnswersContext } from '../hooks/answers.hook'; 


export function PatientSelector() { 
  const dao = useContext(DaoContext); 
  const {patient:value, SetPatient:editValue} = useContext(AnswersContext); 

  const ifield:IField = {accessor:'', label:'', defaultValue:'', type:'string'}; 
  const patients = dao.GetIEntries('patients'); 

  const options:IOption[] = patients.map( p => { 
    const patient = p as IPatient; 
    //const patientLabel = `${patient.ramq} ${patient.lastName}, ${patient.firstName}`; 
    const patientLabel = `${patient.ramq}`; 
    return {value:patient._id, label:patientLabel} 
  }) 

  return <Editor {...{value, editValue, ifield, options}} /> 
} 
