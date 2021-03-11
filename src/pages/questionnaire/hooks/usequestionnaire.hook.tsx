import { useContext } from 'react'; 
import { DaoContext } from '../../../reusable/_dao'; 
import { useSession, Session } from '../../../reusable/_session'; 
import { IsEmpty } from '../../../reusable/_utils'; 
import { usePage, IPageHook } from '../../../reusable/_customhooks'; 
import { feedback } from '../../../components/feedback/feedback.component'; 


export interface IUseQuestionnaire { 
  TestResetSession: () => void; 

  paging: IPageHook<IAnswer>; 
  questionnaire: IAnswer[]; 
  setQuestionnaire: (newAnswer:number, keys:any[]) => void; 
  //GetPages: () => any[][]; 

  AnswersAreComplete: (answers?:IAnswer[]) => boolean; 
  LoadQuestionnaire: () => void; 
  /*GetQuestionnaireItem:(answer:IAnswer) => { 
    form: undefined|IForm; 
    instructions: undefined|IInstruction[]; 
    question: undefined|IQuestion; 
    response: undefined|IResponse; 
  } */
  SubmitQuestionnaire: (answers?:IEntry[]) => void; 
} 


export function useQuestionnaire():IUseQuestionnaire { 
  console.log('questionnaire');
  const {GetIEntries, CreateUpdate} = useContext(DaoContext); 
  const profile = Session.Get('profile') as IEntry; 

  const sessionQuestionnaire = useSession('questionnaire', LoadQuestionnaire()); 
  const questionnaire:IAnswer[] = sessionQuestionnaire.Get(); 
  const setQuestionnaire = (newValue:any, keys:any[] = []) => sessionQuestionnaire.Set(newValue, [...keys]); 
  const paging = usePage(questionnaire, PageBreakPredicates()); 

  function GetQuestion(answer:IAnswer) { 
    const [question] = GetIEntries('questions', [answer?.question]) as IQuestion[]; 
    return question; 
  }

  // LoadQuestionnaire -----------------------------------
  function LoadQuestionnaire() { 
    const loadQuestionnaire = [] as any[]; 
    /*(GetIEntries('answers') as IAnswer[]).filter( a => { 
      return a.patient === profile._id && IsToday(a.date); 
    }) */
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
    feedback.setValue(responses); 
    //setQuestionnaire(LoadQuestionnaire()); 
  } 

  // return form, instructions, question, response
  /*function GetQuestionnaireItem(answer:IAnswer) { 
    if(!answer) 
      return {form:undefined, instructions:undefined, question:undefined, response:undefined}; 
    const [question] = GetIEntries('questions', [answer.question]) as IQuestion[]; 
    const [form] = GetIEntries('forms', [question?.form]) as IForm[]; 
    const instructions = GetIEntries('instructions', question?.instructions) as IInstruction[]; 
    const [response] = GetIEntries('responses', [question?.responseType]) as IResponse[]; 
    return {form, instructions, question, response}; 
  } */

  function AnswersAreComplete(answers?:IAnswer[]) { 
    const _answers = answers ?? questionnaire; 
    return _answers.every( answer => {
      const question = GetQuestion(answer); 
      return question && (question?.optional || answer.answer >=0); 
    }); 
  } 


  // Page Break Predicates =============================================
  function PageBreakPredicates() { 
    function GetQuestionAndPivot(answer:IAnswer, As:IAnswer[]) { 
      const question = GetQuestion(answer); 
      const pivot = GetQuestion(As[0]); 
      return {question, pivot}; 
    } 

    // group by form
    const GroupByForm = (a:IAnswer, As:IAnswer[], Bs:IAnswer[], Cs:IAnswer[]) => { 
      const {question, pivot} = GetQuestionAndPivot(a, As);
      return JSON.stringify(question?.form) === JSON.stringify(pivot?.form) || IsEmpty(As); 
    } 

    // group by instructions set
    const GroupByInstruction = (a:IAnswer, As:IAnswer[], Bs:IAnswer[], Cs:IAnswer[]) => { 
      const {question, pivot} = GetQuestionAndPivot(a, As);
      return JSON.stringify(question?.instructions) === JSON.stringify(pivot?.instructions) || IsEmpty(As); 
    } 

    // max 4 items
    const GroupBy4 = (a:IAnswer, As:IAnswer[], Bs:IAnswer[], Cs:IAnswer[]) => { 
      return As.length < 4; 
    } 

    return [GroupByForm, GroupByInstruction, GroupBy4]; 
  } 


  const TestResetSession = () => {
    sessionQuestionnaire.Reset(); 
  }

  return { 
    TestResetSession, 

    paging, 
    questionnaire, setQuestionnaire, 

    AnswersAreComplete, 
    LoadQuestionnaire, 
    SubmitQuestionnaire 
  } 
}