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
  const {GetIEntries} = useContext(DaoContext); 
  const [question] = GetIEntries('questions', [answer?.qid]) as IQuestion[];
  return question; 
}

export function GetForm(answer:IAnswer):IForm { 
  const {GetIEntries} = useContext(DaoContext); 
  const question = GetQuestion(answer); 
  const [form] = GetIEntries('forms', [question.form]) as IForm[]; 
  return form; 
}

export function GetResponse(answer:IAnswer):IResponse { 
  const {GetIEntries} = useContext(DaoContext); 
  const question = GetQuestion(answer); 
  const [response] = GetIEntries('responses', [question.responseType]) as IResponse[]; 
  return response; 
} 

export function GetInstructions(answer:IAnswer):IInstruction[] {
  const {GetIEntries} = useContext(DaoContext); 
  const question = GetQuestion(answer); 
  return GetIEntries('instructions', question.instructions) as IInstruction[]; 
}
