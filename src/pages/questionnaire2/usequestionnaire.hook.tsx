import { useContext, useEffect } from 'react'; 
import { Filter } from '../../reusable/_arrayutils'; 
import { DaoContext } from '../../reusable/_dao2'; 
import { useSession, Session } from '../../reusable/_session'; 
import { IsEmpty, IsToday } from '../../reusable/_utils'; 

import Patient from '../patient/patient.page'; 


export interface IUseQuestionnaire { 
  questionnaire: IAnswer[]; 
  setQuestionnaire: (newAnswer:number, keys:any[]) => void; 

  LoadQuestionnaire: () => void; 
  GetQuestionnaireItem:(answer:IAnswer) => {
    form: undefined|IForm; 
    instructions: undefined|IInstruction[]; 
    question: undefined|IQuestion; 
    response: undefined|IResponse; 
  } 
  SubmitQuestionnaire: (answers:IEntry[]) => void; 
} 


export function useQuestionnaire():IUseQuestionnaire { 
  const {GetIEntries, CreateUpdate} = useContext(DaoContext); 
  const profile = Session.Get( 'patient', ['profile']) as IEntry; 

  console.log(GetIEntries('questions')); 

  const sessionInitValue = {questionnaire:LoadQuestionnaire()}; 
  console.log(sessionInitValue); 
  const questionnaireSession = useSession('questionnaire', sessionInitValue); 
  if(!questionnaireSession.Get()) 
    questionnaireSession.Set(sessionInitValue) 
  
  const questionnaire = questionnaireSession.Get(['questionnaire']) as IAnswer[]; 
  const setQuestionnaire = (newValue:any, keys:any[] = []) => 
    questionnaireSession.Set(newValue, ['questionnaire', ...keys]); 

  useEffect(() => { 
    SubmitQuestionnaire(); 
  }, []); 

  // LoadQuestionnaire -----------------------------------
  function LoadQuestionnaire() { 
    const loadQuestionnaire = (GetIEntries('answers') as IAnswer[]).filter( a => { 
      return a.patient === profile._id && IsToday(a.date); 
    }) 
    return IsEmpty(loadQuestionnaire) ? BlankQuestionnaire() : loadQuestionnaire; 
  } 

  // BlankQuestionnaire ----------------------------------- 
  function BlankQuestionnaire():IAnswer[] { 
    const entries = GetIEntries('questions'); 
    return entries.map( q => { 
      return {_id:'', patient:profile._id, date: new Date(), question:q._id, answer:-1} as IAnswer; 
    }); 
  } 

  // SubmitQuestionnaire ----------------------------------
  async function SubmitQuestionnaire(answers?:IEntry[]) { 
    const toSubmit = answers ?? questionnaire; 
    const responses = await CreateUpdate('answers', toSubmit); 
    setQuestionnaire(LoadQuestionnaire()); 
  } 


  // return form, instructions, question, response
  function GetQuestionnaireItem(answer:IAnswer) { 
    if(!answer) 
      return {form:undefined, instructions:undefined, question:undefined, response:undefined}; 
    const [question] = GetIEntries('questions', [answer.question]) as IQuestion[]; 
    const [form] = GetIEntries('forms', [question?.form]) as IForm[]; 
    const instructions = GetIEntries('instructions', question?.instructions) as IInstruction[]; 
    const [response] = GetIEntries('responses', [question.responseType]) as IResponse[]; 
    return {form, instructions, question, response}; 
  } 


  return { 
    questionnaire, setQuestionnaire, 
    LoadQuestionnaire, 
    GetQuestionnaireItem, 
    SubmitQuestionnaire 
  } 
}