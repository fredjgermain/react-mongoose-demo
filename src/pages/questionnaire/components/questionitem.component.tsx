import { useContext } from 'react'; 
import { Editor } from '../../../libs/editor_reader/_editor_reader'; 
import { QuestionnaireContext } from '../questionnaire.page'; 
import { useQuestionnaireItem } from '../hooks/usequestionnaireitem.hook'; 


export function QuestionItem({index}:{index:number}) { 
  const {AnswersAreComplete} = useContext(QuestionnaireContext); 
  const {answer, question, IEditorArgs} = useQuestionnaireItem(index); 
  const label = question?.labels[0]; 
  const success = {className:'success', symbol:'✓'}; 
  const failure = {className:'failure', symbol:'x'}; 

  const display = AnswersAreComplete([answer]) ? success: failure; 

  return <div className={'questionItem'}> 
    <span>{label} : </span> 
    <span><Editor {...IEditorArgs} /></span> 
    <span className={display.className}> {display.symbol} {question?.optional && '?'}</span> 
  </div>
}

