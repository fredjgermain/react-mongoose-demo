import React, { useContext } from 'react'; 
import { Arrx, Elements, Element, ElementContext } from '../../../reusable/_arrx'; 
import { DaoContext} from '../../../reusable/_dao'; 
import { Editor } from '../../../reusable/_input'; 
import {QuestionnnaireContext} from '../questionnaire.page'; 

import '../../../css/feedback.css'; 


export function QuestionItem({answer, index}:{answer:IAnswer, index:number}) { 
  const {questionnaire, GetQuestionnaireItem, AnswersAreComplete} = useContext(QuestionnnaireContext); 
  const {question, response} = GetQuestionnaireItem(answer); 


  return <div> </div>
}


// Item Is Complete =========================================
export function ItemIsComplete() {
  const {questionnaire, GetQuestionnaireItem, AnswersAreComplete} = useContext(QuestionnnaireContext); 
  const {index} = useContext(ElementContext); 
  const answer = questionnaire[index]; 
  const {question} = GetQuestionnaireItem(answer); 

  const success = {className:'success', symbol:'✓'}; 
  const failure = {className:'failure', symbol:'x'}; 
  //const optional = {className:'optional', symbol:'?'}; 

  const display = AnswersAreComplete([answer]) ? success: failure; 
  console.log(question?.optional); 
  
  return <span className={display.className}>{display.symbol} {question?.optional && '?'}</span>
}



// Item question Label =========================================
export function ItemLabel() { 
  const {questionnaire, GetQuestionnaireItem} = useContext(QuestionnnaireContext); 
  const {index} = useContext(ElementContext); 
  const answer = questionnaire[index]; 
  const {question} = GetQuestionnaireItem(answer); 
  const label = question?.labels[0]; 

  return <span>{label}</span>
}

// Item Response choice ====================================
export function ItemResponse(index:number) { 
  const {questionnaire, setQuestionnaire, GetQuestionnaireItem} = useContext(QuestionnnaireContext); 
  //const {index} = useContext(ElementContext); 
  const answer = questionnaire[index] as IAnswer; 
  const {response} = GetQuestionnaireItem(answer); 
  

  const enums = response?.responseType['enum'] as string[]; 
  const value = answer.answer; 
  const setValue = (newAnswer:number) => setQuestionnaire(newAnswer, [index, 'answer']); 
  const options = enums?.map( (e, i) => { 
    return {value:i, label:e}; 
  }); 

  const ifield = {accessor:'', label:'', type:'number', defaultValue:-1, 
    enums, isEnum:!!enums} as IField; 
  
  return <Editor {...{value, setValue, ifield, options} }/> 
  /*const ifield = responseTypeArgs.ifield; 
  const options = responseTypeArgs.options; */

  //return <Editor {...{value, setValue, ifield, options}}/> 

  /*const type = response?.responseType['type'] 
  const defaultValue = ''; 
  const options = (response?.responseType['enum'] as string[]).map( (e, i) => { 
    return {value:i, label:e}; 
  }); 
  const ifield = {accessor:'', label:'', type, defaultValue} as IField;
  
  //return <span>{JSON.stringify(response)}</span> 
  return <Editor {...{value, setValue, ifield, options}} />*/
} 