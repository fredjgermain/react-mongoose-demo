import {useContext} from 'react'; 
import {CrudContext} from '../../../reusable/_crud'; 
import {ElementContext} from '../../../reusable/_arrx'; 
import {PatientContext} from '../../patient/patient.page'; 


export function GetAnswer(_index?:number):IAnswer { 
  const {questionnaire} = useContext(PatientContext); 
  const {index} = useContext(ElementContext); 
  return questionnaire[index??_index] as IAnswer; 
} 

export function GetQuestion(answer:IAnswer):IQuestion { 
  const {GetIEntries} = useContext(CrudContext); 
  const [question] = GetIEntries('questions', [answer?.qid]) as IQuestion[]; 
  return question; 
} 

export function GetForm(answer:IAnswer):IForm { 
  const {GetIEntries} = useContext(CrudContext); 
  const question = GetQuestion(answer); 
  const [form] = GetIEntries('forms', [question.form]) as IForm[]; 
  return form; 
} 

export function GetResponse(answer:IAnswer):IResponse { 
  const {GetIEntries} = useContext(CrudContext); 
  const question = GetQuestion(answer); 
  const [response] = GetIEntries('responses', [question.responseType]) as IResponse[]; 
  return response; 
} 

export function GetInstructions(answer:IAnswer):IInstruction[] { 
  const {GetIEntries} = useContext(CrudContext); 
  const question = GetQuestion(answer); 
  return GetIEntries('instructions', question.instructions) as IInstruction[]; 
} 
