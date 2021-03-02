import { useContext, useEffect } from 'react'; 
import { DaoContext } from '../../reusable/_dao2'; 
import { useSession, Session } from '../../reusable/_session'; 
import { IsEmpty, IsToday } from '../../reusable/_utils'; 
import { usePage, IPageHook } from '../../reusable/_usepage'; 


export interface IUseQuestionnaire { 
  paging: IPageHook<IAnswer>;
  questionnaire: IAnswer[]; 
  setQuestionnaire: (newAnswer:number, keys:any[]) => void; 
  //GetPages: () => any[][]; 

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

  const sessionInitValue = {questionnaire:LoadQuestionnaire()}; 
  //console.log(sessionInitValue); 
  const questionnaireSession = useSession('questionnaire', sessionInitValue); 
  if(!questionnaireSession.Get()) 
    questionnaireSession.Set(sessionInitValue) 
  
  const questionnaire = questionnaireSession.Get(['questionnaire']) as IAnswer[]; 
  const setQuestionnaire = (newValue:any, keys:any[] = []) => 
    questionnaireSession.Set(newValue, ['questionnaire', ...keys]); 

  //const groupedIndexes = Groups(indexes, [GroupByForm, GroupByInstruction, GroupBy4]); 
  //const pages = groupedIndexes.map( group => group.map( i => questionnaire[i]) ); 
  //return pages; 
  const paging = usePage(questionnaire, PageBreakPredicates()); 

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


  function PageBreakPredicates() { 
    function GetQuestionAndPivot(answer:IAnswer, As:IAnswer[]) { 
      const question = GetQuestionnaireItem(answer).question as IQuestion; 
      const pivot = GetQuestionnaireItem(As[0])?.question as IQuestion; 
      return {question, pivot}; 
    } 

    // group by form
    const GroupByForm = (a:IAnswer, i:number, As:IAnswer[], Bs:IAnswer[], Cs:IAnswer[]) => { 
      const {question, pivot} = GetQuestionAndPivot(a, As);
      return JSON.stringify(question?.form) === JSON.stringify(pivot?.form) || IsEmpty(As); 
    } 

    // group by instructions set
    const GroupByInstruction = (a:IAnswer, i:number, As:IAnswer[], Bs:IAnswer[], Cs:IAnswer[]) => { 
      const {question, pivot} = GetQuestionAndPivot(a, As);
      return JSON.stringify(question?.instructions) === JSON.stringify(pivot?.instructions) || IsEmpty(As); 
    } 

    // max 4 items
    const GroupBy4 = (a:IAnswer, i:number, As:IAnswer[], Bs:IAnswer[], Cs:IAnswer[]) => { 
      return As.length < 4; 
    } 

    return [GroupByForm, GroupByInstruction, GroupBy4]; 
  } 


  return { 
    paging, 
    questionnaire, setQuestionnaire, 
    LoadQuestionnaire, 
    GetQuestionnaireItem, 
    SubmitQuestionnaire 
  } 
}