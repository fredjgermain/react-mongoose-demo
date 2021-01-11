import React, {useContext, useEffect, useState} from 'react'; 
import {Arrx, Elements, ArrxContext, ElementContext, ElementIndex} from '../../../reusable/components/arrx/_arrx'; 
import {Input, Select, Options, InputArray} from '../../../reusable/components/input/_input'; 
import {AnswersAreComplete, IAnswer} from './useblankform'; 



// QUESTION EDIT ================================
export function QuestionEdit({setValues}:{setValues:any}) { 
  const {values} = useContext(ArrxContext); 
  const {index} = useContext(ElementContext); 
  const Answer = (values[index] as IAnswer); 
  const {labels, optional, answer, responseType} = Answer; 
  
  const [value, setValue] = useState(answer); 
  const {type, defaultValue} = {type:'number', defaultValue:0}; 

  const UpdateAnswers = () => setValues((prev:any) => { 
    const editedAnswers:IAnswer[] = [...prev]; 
    const editedAnswer:IAnswer = editedAnswers[index]; 
    editedAnswer.answer = value; 
    return editedAnswers; 
  }); 

  useEffect(() => {UpdateAnswers()},[value]); 

  const options:IOption[] = responseType.enum ? 
    responseType.enum.map( (v,i) => { return {value:i, label:v} }) : [] ; 

  const input = <Input {...{value, setValue, type, defaultValue}} />
  const select = <span>
    <Select {...{value, setValue, type, defaultValue}} >
      <Options {...{options}} />
    </Select>
  </span>


  return <div> 
    [<ElementIndex /><span>{labels[0]}: </span>] 
    {AnswersAreComplete([{...Answer, answer:value}]) ? 
      <span>&#10003;</span> : 
      <span>X</span>}
    <span>{!responseType.enum ? input : select}</span> 
  </div> 
} 
