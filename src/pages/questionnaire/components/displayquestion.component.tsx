import React, {useContext} from 'react'; 
import {AnswersContext} from '../questionnaire.page'; 

import {GetValueAt, SetValueAt, GetDefaultValueByType} from '../../../reusable/_utils'; 
import {GetAnswer, GetForm, GetInstructions, GetQuestion, GetResponse} from './questionnaire.utils'; 
import {Editor} from '../../../reusable/_input'; 
import {Arrx, Elements, ElementContext} from '../../../reusable/_arrx'; 

import {usePage} from '../../../reusable/_usepage'; 
import {PageBreaker, Paging} from './paging.component'; 


// DISPLAY QUESTIONS ===================================
export function DisplayQuestions() { 
  const {answers} = useContext(AnswersContext); 
  const {pageIndex, setPageIndex, pages} = usePage(answers, PageBreaker()); 
  const page = pages[pageIndex]; 
  //const {question, instructions, response} = GetQuestionInfos(answer, GetCollections()); 

  return <div> 
    <DisplayFormTitle {...{page}} /> 
    <DisplayInstructions {...{page}} /> 
    <Arrx {...{values:answers}} > 
      <Elements {...{indexes:page}}> 
        <DisplayQuestionLabel/> <DisplayResponseField/><br/> 
      </Elements> 
    </Arrx> 
    <Paging {...{pageIndex, setPageIndex, pages}} /> 
  </div> 
} 

function DisplayQuestionLabel () { 
  const question = GetQuestion(GetAnswer()); 
  return <span>{question.labels[0]} : {question.optional && '**'}</span> 
} 


function DisplayResponseField() { 
  const {answers, setAnswers} = useContext(AnswersContext); 
  const {index} = useContext(ElementContext); 

  const value = GetValueAt(answers, [index, 'answer']); 
  const setValue = (newAnswer:number) => { 
    setAnswers(SetValueAt(answers, newAnswer, [index, 'answer'])); 
  } 
  const {responseType} = GetResponse(GetAnswer()); 
  const type = (responseType['type'] as string).toLowerCase(); 
  const defaultValue = GetDefaultValueByType(type); 
  const ifield:IField = {type, isEnum:!!responseType['enum'], enums:responseType['enum'], 
    accessor:'', label:'', defaultValue} 
  const options:IOption[] = (responseType['enum'] as string[]).map( (e, i) => { 
    return {value:i, label:e}; 
  }); 
  
  return <span><Editor {...{value, setValue, ifield, options}} /></span> 
} 

function DisplayFormTitle({page}:{page:number[]}) { 
  const form = GetForm(GetAnswer(page[0])); 
  return <h3>{form.titles[0]}</h3> 
} 

function DisplayInstructions({page}:{page:number[]}) { 
  const instructions = GetInstructions(GetAnswer(page[0])); 
  return <div>
    {JSON.stringify(instructions)}
    {instructions.map( (ins, i)=> { 
      return <div key={i}>| {ins.labels[0]} |</div> 
    })} 
  </div> 
} 