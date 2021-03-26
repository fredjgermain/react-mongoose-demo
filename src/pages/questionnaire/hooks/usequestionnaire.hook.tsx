import { useContext } from 'react'; 
import { DaoContext } from '../../../reusable/_dao'; 
import { useSession } from '../../../reusable/_session'; 
import { IsEmpty } from '../../../reusable/_utils'; 
import { usePage, IPageHook } from '../../../reusable/_customhooks'; 
import { QuestionnaireFeedBackRef, useQuestionnaireFeedbackRef } from '../components/questionnaire.feedback'; 


export interface IUseQuestionnaire { 
  TestResetSession: () => void; 

  paging: IPageHook<IAnswer>; 
  questionnaire: IAnswer[]; 
  setQuestionnaire: (newAnswer:number, keys:any[]) => void; 

  feedbackRef:QuestionnaireFeedBackRef; 
  //GetPages: () => any[][]; 

  AnswersAreComplete: (answers?:IAnswer[]) => boolean; 
  LoadQuestionnaire: () => void; 
  /*GetQuestionnaireItem:(answer:IAnswer) => { 
    form: undefined|IForm; 
    instructions: undefined|IInstruction[]; 
    question: undefined|IQuestion; 
    response: undefined|IResponse; 
  } */
  SubmitQuestionnaire: (answers?:IEntry[]) => Promise<ICrudResponse[]>; 
} 

export function useQuestionnaire(patient:IEntry):IUseQuestionnaire { 
  //console.log('questionnaire'); 
  const dao = useContext(DaoContext); 
  const date = new Date(); 
  const feedbackRef = useQuestionnaireFeedbackRef(); 
  //const profile = Session.Get('profile') as IEntry; 

  // Questionnaire session --------------------------------
  const sessionQuestionnaire = useSession('questionnaire', LoadQuestionnaire()); 
  const questionnaire:IAnswer[] = sessionQuestionnaire.Get(); 
  const setQuestionnaire = (newValue:any, keys:any[] = []) => sessionQuestionnaire.Set(newValue, [...keys]); 

  // Paging -----------------------------------------------
  const paging = usePage(questionnaire, PageBreakPredicates()); 


  
  function GetQuestion(answer:IAnswer) { 
    const [question] = dao.GetIEntries('questions', [answer?.question]) as IQuestion[]; 
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
    const entries = dao.GetIEntries('questions'); 
    return entries.map( q => { 
      //const appointment:IAppointment = {patient._id, date:Date.now()} 
      return {_id:'', patient:patient?._id ?? '', date, question:q._id, answer:-1} as IAnswer; 
    }); 
  } 

  // SubmitQuestionnaire ----------------------------------
  async function SubmitQuestionnaire(answers?:IEntry[]) { 
    const toSubmit = answers ?? questionnaire; 
    const responses = await dao.CreateUpdate('answers', toSubmit); 
    return responses; 
  } 


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

    feedbackRef, 

    AnswersAreComplete, 
    LoadQuestionnaire, 
    SubmitQuestionnaire 
  } 
}