import {useContext} from 'react'; 
import {DaoContext} from '../../../reusable/_dao'; 
import {ElementContext} from '../../../reusable/_arrx'; 
import {AnswersContext} from '../questionnaire.page'; 


export function GetAnswer(_index?:number):IAnswer { 
  const {answers} = useContext(AnswersContext); 
  const {index} = useContext(ElementContext); 
  return answers[index??_index] as IAnswer; 
} 

export function GetQuestion(answer:IAnswer):IQuestion { 
  const {GetEntry} = useContext(DaoContext); 
  return GetEntry('questions', answer?.qid) as IQuestion; 
}

export function GetForm(answer:IAnswer):IForm { 
  const {GetEntry} = useContext(DaoContext); 
  const question = GetQuestion(answer); 
  return GetEntry('forms', question.form) as IForm; 
}

export function GetResponse(answer:IAnswer):IResponse { 
  const {GetEntry} = useContext(DaoContext); 
  const question = GetQuestion(answer); 
  return GetEntry('responses', question.responseType) as IResponse; 
} 


export function GetInstructions(answer:IAnswer):IInstruction[] {
  const {GetEntry} = useContext(DaoContext); 
  const question = GetQuestion(answer); 
  const iids = question.instructions; 
  return iids.map(i=> GetEntry('instructions', i) as IInstruction ) as IInstruction[];  
}
