import {useContext, useState} from 'react'; 
import {PatientContext} from '../../patient/patient.page'; 
import {QuestionnaireContext} from '../questionnairepage.page'; 
import {IsNull} from '../../../reusable/utils/_utils'; 

export interface IResponseType { 
  type: string; 
  enum?: any[]; 
  range?: any; 
} 

export interface IAnswer { 
  pid:string; 
  qid:string; 
  optional:boolean; 
  labels: string[]; 
  responseType: IResponseType; 
  //date: ; 
  answer:any; 
} 



// UseBlankForm ===============================
export function useBlankForm() { 
  const {patient:{_id:pid}} = useContext(PatientContext); 
  const {questions, responses} = useContext(QuestionnaireContext); 
  
  const GetResponseType = (id:string) => { 
    const response = responses.entries.find(r=>r._id===id); 
    if(response) 
      return response['responseType']; 
    return 'no responses'; 
  } 

  const blankAnswers:IAnswer[] = questions.entries.map( q => { 
    return {pid, 
      qid:q._id, 
      labels:q['labels'], 
      optional: q['optional'], 
      responseType: GetResponseType(q['responseType']), 
      answer:null, 
    } as IAnswer; 
  }); 
  const [answers, setAnswers] = useState<IAnswer[]>(blankAnswers); 
  return {answers, setAnswers}; 
} 



// Answers are complete -------------------------
export function AnswersAreComplete(answers:IAnswer[]) { 
  return !answers.some( a => !a.optional && IsNull(a.answer) ); 
} 