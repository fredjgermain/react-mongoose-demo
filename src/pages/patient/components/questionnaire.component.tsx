import React, {useContext, useState} from 'react';
import {Objx, ObjxContext, Fields, FieldLabel, FieldContext, FieldValue} from '../../../reusable/objx/_objx';
import {PatientContext} from '../patient.page'; 


interface IAnswer extends IEntry { 
  pid:string; 
  qId:string; 
  optional:boolean; 
  //date: ; 
  answer:any; 
} 



function useAnswers() { 
  const {questions:{entries}} = useContext(PatientContext); 
  const {patient:{_id:pid}} = useContext(PatientContext); 
  const blankAnswers = entries.map( q => { 
    return {pid, qid:q._id, optional:q.optional, answer:null}; 
  }); 
  const [answers, setAnswers] = useState(blankAnswers); 
  return {answers, setAnswers}; 
} 


// QUESTIONNAIRE ================================
export function Questionnaire() { 
  const {questions:{entries}} = useContext(PatientContext); 
  const {answers, setAnswers} = useAnswers(); 
  // create a blank answers object 

  return <div> 
    <h2>QUESTIONNAIRE</h2> 
    {entries.map((entry:IEntry, key)=> { 
      return <DisplayQuestion {...{key, entry}}/>; 
    })} 
  </div> 
} 


function DisplayQuestion({entry}:{entry:IEntry}) { 
  const [obj, setObj] = useState(entry); 
  const {questions:{ifields}} = useContext(PatientContext); 
  const fieldsToDisplay = ['labels', 'responseType']; 
  const IFields = ifields.filter(f => fieldsToDisplay.includes(f.accessor)); 

  return <Objx {...{obj, setObj, ifields:IFields}}> 
    -------------------------------------
    <Fields> 
      <FieldLabel/> 
      <FieldValue /> 
      <br/> 
      ... 
    </Fields> 
    ------------------------------------- 
  </Objx> 
  
}

