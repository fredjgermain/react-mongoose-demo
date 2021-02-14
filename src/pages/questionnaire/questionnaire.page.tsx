import React, {useContext, useEffect, useState} from 'react'; 
import {PatientContext} from '../patient/patient.page'; 
import {DisplayFormTitle, DisplayInstructions, 
  DisplayQuestionLabel, DisplayResponseField} 
  from './components/displayquestion.component'; 
  import {Arrx, Elements, ElementContext} from '../../reusable/_arrx'; 

import {usePage} from '../../reusable/_usepage'; 
import {PageBreaker, Paging} from './components/paging.component'; 

// Questionnaire ================================ 
export function Questionnaire() { 
  const {questionnaire, patientProfile} = useContext(PatientContext); 
  const {pageIndex, setPageIndex, pages} = usePage(questionnaire, PageBreaker()); 
  const page = pages[pageIndex] ?? []; 

  return <div> 
    <h2>Patient questionnaire</h2> 
    <div>patient: {JSON.stringify(patientProfile['ramq'])}</div> 
    <h3>Questionnaire form ...</h3> 
    <DisplayFormTitle {...{page}} /> 
    <DisplayInstructions {...{page}} /> 
    <Arrx {...{values:questionnaire}} > 
      <Elements {...{indexes:page}}> 
        <DisplayQuestionLabel/> <DisplayResponseField/><br/> 
      </Elements> 
    </Arrx> 
    <Paging {...{pageIndex, setPageIndex, pages}} />
  </div> 
} 

