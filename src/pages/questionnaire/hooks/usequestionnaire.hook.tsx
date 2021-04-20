import { useContext } from 'react'; 
import { DaoContext } from '../../../libs/_dao'; 
import { useSession } from '../../../libs/_session'; 
import { IsEmpty } from '../../../libs/_utils'; 
import { usePage, IPageHook } from '../../../libs/pager/_pager'; 
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
  //const blankQuestionnaire = BlankQuestionnaire(); 
  const sessionQuestionnaire = useSession('questionnaire', LoadQuestionnaire()); 
  const questionnaire:IAnswer[] = sessionQuestionnaire.Get(); 
  const setQuestionnaire = (newValue:any, keys:any[] = []) => sessionQuestionnaire.Set(newValue, [...keys]); 

  // Paging -----------------------------------------------
  const paging = usePage(questionnaire, PageGrouping()); 
  
  function GetQuestion(answer:IAnswer) { 
    const [question] = dao.GetIEntries('questions', [answer?.question]) as IQuestion[]; 
    return question; 
  } 

  // LoadQuestionnaire -----------------------------------
  function LoadQuestionnaire() { 
    const loadQuestionnaire = [] as any[]; 
    const questions = IsEmpty(loadQuestionnaire) ? BlankQuestionnaire() : loadQuestionnaire; 
    return questions // Sorts(questions, [QuestionSorting()]); 
  } 

  // BlankQuestionnaire ----------------------------------- 
  function BlankQuestionnaire():IAnswer[] { 
    const entries = dao.GetIEntries('questions'); 
    const patientId = patient?._id ?? ''; 
    return entries.map( q => { 
      return {_id:'', patient:patientId, date, question:q._id, answer:-1} as IAnswer; 
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

  function QuestionSorting() { 
    return (t:IAnswer, pivot:IAnswer) => { 
      const q = GetQuestion(t); 
      const qPivot = GetQuestion(pivot); 
      // Regroup question by form. 
      const byForm = JSON.stringify(q?.form) === JSON.stringify(qPivot?.form); 
      // Regroup question by instruction. 
      const byInstruction = JSON.stringify(q?.instructions) === JSON.stringify(qPivot?.instructions); 
      return byForm && byInstruction; 
    } 
  } 

  // Page Break Predicates ============================================= 
  function PageGrouping() { 
    return (t:IAnswer, i:number, a:IAnswer[], positive:IAnswer[]) => { 
      const [pivot] = a; 
      const q = GetQuestion(t); 
      const qPivot = GetQuestion(pivot); 
      
      // Regroup question by form. 
      const byForm = JSON.stringify(q?.form) === JSON.stringify(qPivot?.form); 
      // Regroup question by instruction. 
      const byInstruction = JSON.stringify(q?.instructions) === JSON.stringify(qPivot?.instructions); 
      // Max 4 question per page. 
      const pageCap = positive.length < 4; 
      return byForm && byInstruction && pageCap; 
    } 
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