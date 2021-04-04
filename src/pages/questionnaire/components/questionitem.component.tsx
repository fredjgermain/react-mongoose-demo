import { useContext } from 'react'; 
import { Editor } from '../../../reusable/_input'; 
import {QuestionnaireContext} from '../questionnaire.page'; 
import { useQuestionnaireItem } from '../hooks/usequestionnaireitem.hook';

import '../../../css/feedback.css'; 


export function QuestionItem({index}:{index:number}) { 
  const {AnswersAreComplete} = useContext(QuestionnaireContext); 
  const {answer, question, IEditorArgs} = useQuestionnaireItem(index); 
  const label = question?.labels[0]; 
  const success = {className:'success', symbol:'✓'}; 
  const failure = {className:'failure', symbol:'x'}; 

  const display = AnswersAreComplete([answer]) ? success: failure; 

  return <div className={'questionItem'}> 
    <div>{label} : </div> 
    <div><Editor {...IEditorArgs} /></div> 
    <div className={display.className}> {display.symbol} {question?.optional && '?'}</div> 
  </div>
}

