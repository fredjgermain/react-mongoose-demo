import { useContext } from 'react'; 
import { Editor } from '../../../reusable/_input'; 
import {QuestionnnaireContext} from '../questionnaire.page'; 
import { useQuestionnaireItem } from '../hooks/usequestionnaireitem.hook';

import '../../../css/feedback.css'; 


export function QuestionItem({index}:{index:number}) { 
  const {AnswersAreComplete} = useContext(QuestionnnaireContext); 
  const {answer, question, IEditorArgs} = useQuestionnaireItem(index); 
  const label = question?.labels[0]; 
  const success = {className:'success', symbol:'✓'}; 
  const failure = {className:'failure', symbol:'x'}; 

  const display = AnswersAreComplete([answer]) ? success: failure; 

  return <div> 
    <span>{label}</span> 
    <Editor {...IEditorArgs} /> 
    <span className={display.className}>{display.symbol} {question?.optional && '?'}</span>
  </div>
}

