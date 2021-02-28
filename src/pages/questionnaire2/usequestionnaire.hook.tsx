import { useContext, useEffect } from 'react'; 
import { Filter, Group } from '../../reusable/_arrayutils'; 
import { DaoContext } from '../../reusable/_dao2'; 
import { useSession, Session } from '../../reusable/_session'; 
import { IsEmpty, IsToday } from '../../reusable/_utils'; 

import Patient from '../patient/patient.page'; 
import { Questionnaire } from '../questionnaire/questionnaire.page';


export interface IUseQuestionnaire { 
  questionnaire: IAnswer[]; 
  setQuestionnaire: (newAnswer:number, keys:any[]) => void; 
  GetPages: () => any[][]; 

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

  //console.log(GetIEntries('questions')); 

  const sessionInitValue = {questionnaire:LoadQuestionnaire()}; 
  //console.log(sessionInitValue); 
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

  // group by
  // sameForm
  // sameInstructions
  // max 4 questions per page. 
  function GetPages() { 
    // PageBreak predicate 
    const PageBreak = (index:number, i:number, array:number[]) => { 
      const answer = questionnaire[index]; 
      const answers = array.map( index => questionnaire[index]); 
        //const predicate = (answer:IAnswer, i:number, answers:IAnswer[]) => { 
      const question = GetQuestionnaireItem(answer).question as IQuestion; 
      const questions = answers.map( answer => GetQuestionnaireItem(answer).question as IQuestion); 

      // Predicate on single element and on accumulator for page size 
      const predicate = (question:IQuestion, i:number, array:IQuestion[]) => { 
        const [first] = array; 
        // same form 
        const sameForm = question?.form === first.form; 
        // same instructions 
        const sameInstructions = JSON.stringify(question?.instructions) === JSON.stringify(first.instructions); 
        return sameForm && sameInstructions; 
      } 
      // group max length
      const accumulator = questions.filter((v,_i) => _i <= i); 
      return accumulator.filter(predicate).length <= 4 && predicate(question, i, questions); 
    }
    

    const indexes = questionnaire.map((v,i) => i); 
    return Group(indexes, PageBreak); 
  } 


  return { 
    questionnaire, setQuestionnaire, 
    GetPages, 
    LoadQuestionnaire, 
    GetQuestionnaireItem, 
    SubmitQuestionnaire 
  } 
}