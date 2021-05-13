import { useContext } from 'react'; 
import { Sorts } from '../../../libs/_arrayutils';
import { useStateReset } from '../../../libs/_customhooks';
import { DaoContext } from '../../../libs/_dao'; 
import { Session, useSession } from '../../../libs/_session'; 
import { IsEmpty } from '../../../libs/_utils'; 
import { usePager, IPageHook } from '../../../libs/pager/_pager'; 
//import { QuestionnaireFeedBackRef, useQuestionnaireFeedbackRef } from '../components/questionnaire.feedback'; 


export interface IUseQuestionnaire {
  patient: IEntry; 

  feedBack: ICrudResponse[]; 
  SetFeedback: (newValue: ICrudResponse[]) => void; 
  ResetFeedback: () => void; 
  
  questionnaire: IQItem[]; 
  SetQuestionnaire: (newValue: IQItem[]) => void; 
  ResetQuestionnaire: () => void; 

  paging: IPageHook<IQItem>; 

  BlankQuestionnaire(): IQItem[]; 
  SubmitQuestionnaire(answers?: IQItem[] | undefined): Promise<ICrudResponse[]>; 
  AnswersAreComplete(answers?: IQItem[] | undefined): boolean; 
  PageGrouping(): (t: IQItem, i: number, a: IQItem[], positive: IQItem[]) => boolean; 
}



/* 
make blank questionnaire. 


*/
export interface IQItem {
  form: IForm; 
  instructions: IInstruction[]; 
  question: IQuestion; 
  response: IResponse;
  answer: number;
}

export function useQuestionnaire() : IUseQuestionnaire{ 
  const dao = useContext(DaoContext); 
  const patient = Session.Get('profile') as IEntry; 
  const today = new Date(); // today ... 
  const [feedBack, SetFeedback, ResetFeedback] = useStateReset([] as ICrudResponse[]); 
  const [questionnaire, SetQuestionnaire, ResetQuestionnaire] = useStateReset(BlankQuestionnaire()); 
  const paging = usePager(questionnaire, PageGrouping()); 

  function BlankQuestionnaire():IQItem[] { 
    const questionsEntries = dao.GetIEntries('questions') as IQuestion[]; 
    const unsortedBlankQuestionnaire = questionsEntries.map( question => { 
      const [form] = dao.GetIEntries('forms', [question.form]) as IForm[]; 
      const instructions = dao.GetIEntries('instructions', question.instructions) as IInstruction[]; 
      const [response] = dao.GetIEntries('responses', [question.responseType]) as IResponse[]; 
      return {form, instructions, question, response, answer:-1}; 
    }) 
    const sortedBlankQuestionnaire = Sorts(unsortedBlankQuestionnaire, [ 
      (a, pivot) => a.form < pivot.form, 
      (a, pivot) => a.question.order < pivot.question.order 
    ]); 

    return sortedBlankQuestionnaire; 
  } 

  // SubmitQuestionnaire ----------------------------------
  async function SubmitQuestionnaire(answers?:IQItem[]) { 
    const toSubmit = (answers ?? questionnaire).map( a => { 
      const {question, answer} = a; 
      return {_id:'', question:question._id, date:today, patient:patient._id, answer} as IAnswer; 
    }); 
    const responses = await dao.CreateUpdate('answers', toSubmit); 
    SetFeedback(responses); 
    return responses; 
  } 

  function AnswersAreComplete(answers?:IQItem[]) { 
    const _answers = answers ?? questionnaire; 
    return _answers.every( answer => { 
      const isOptional = answer.question.optional; 
      return !isOptional && answer.answer >=0 || isOptional; 
    }); 
  } 

  function PageGrouping() { 
    return (t:IQItem, i:number, a:IQItem[], positive:IQItem[]) => { 
      const [pivot] = a; 
      // Regroup by form. 
      const byForm = JSON.stringify(t.form._id) === JSON.stringify(pivot.form._id); 
      // Regroup question by instruction. 
      const byInstruction = JSON.stringify(t.instructions) === JSON.stringify(pivot.instructions); 
      // Max 4 question per page. 
      const pageCap = positive.length < 3; 
      return byForm && byInstruction && pageCap; 
    } 
  } 
  return {patient, 
    feedBack, SetFeedback, ResetFeedback, 
    questionnaire, SetQuestionnaire, ResetQuestionnaire, 
    paging, 
    BlankQuestionnaire, SubmitQuestionnaire, AnswersAreComplete, 
    PageGrouping
  }
} 


// export interface IUseQuestionnaire { 
//   TestResetSession: () => void; 
//   questionnaire: IAnswer[]; 
//   setQuestionnaire: (newAnswer:number, keys:any[]) => void; 

//   feedbackRef:QuestionnaireFeedBackRef; 
//   //GetPages: () => any[][]; 

//   AnswersAreComplete: (answers?:IAnswer[]) => boolean; 
//   LoadQuestionnaire: () => void; 
//   /*GetQuestionnaireItem:(answer:IAnswer) => { 
//     form: undefined|IForm; 
//     instructions: undefined|IInstruction[]; 
//     question: undefined|IQuestion; 
//     response: undefined|IResponse; 
//   } */
//   SubmitQuestionnaire: (answers?:IEntry[]) => Promise<ICrudResponse[]>; 
// } 

// export function useQuestionnaire(patient:IEntry):IUseQuestionnaire { 
//   //console.log('questionnaire'); 
  
//   const dao = useContext(DaoContext); 
//   const date = new Date(); 
//   const feedbackRef = useQuestionnaireFeedbackRef(); 
//   //const profile = Session.Get('profile') as IEntry; 

//   // Questionnaire session --------------------------------
//   //const blankQuestionnaire = BlankQuestionnaire(); 
//   const sessionQuestionnaire = useSession('questionnaire', LoadQuestionnaire()); 
//   const questionnaire:IAnswer[] = sessionQuestionnaire.Get(); 
//   const setQuestionnaire = (newValue:any, keys:any[] = []) => sessionQuestionnaire.Set(newValue, [...keys]); 

  
//   function GetQuestion(answer:IAnswer) { 
//     const [question] = dao.GetIEntries('questions', [answer?.question]) as IQuestion[]; 
//     return question; 
//   } 

//   // LoadQuestionnaire -----------------------------------
//   function LoadQuestionnaire() { 
//     const loadQuestionnaire = [] as any[]; 
//     const questions = IsEmpty(loadQuestionnaire) ? BlankQuestionnaire() : loadQuestionnaire; 
//     return questions // Sorts(questions, [QuestionSorting()]); 
//   } 

//   // BlankQuestionnaire ----------------------------------- 
//   function BlankQuestionnaire():IAnswer[] { 
//     const entries = dao.GetIEntries('questions'); 
//     const patientId = patient?._id ?? ''; 
//     return entries.map( q => { 
//       return {_id:'', patient:patientId, date, question:q._id, answer:-1} as IAnswer; 
//     }); 
//   } 

  // // SubmitQuestionnaire ----------------------------------
  // async function SubmitQuestionnaire(answers?:IEntry[]) { 
  //   const toSubmit = answers ?? questionnaire; 
  //   const responses = await dao.CreateUpdate('answers', toSubmit); 
  //   return responses; 
  // } 

  // function AnswersAreComplete(answers?:IAnswer[]) { 
  //   const _answers = answers ?? questionnaire; 
  //   return _answers.every( answer => {
  //     const question = GetQuestion(answer); 
  //     return question && (question?.optional || answer.answer >=0); 
  //   }); 
  // } 

//   function QuestionSorting() { 
//     return (t:IAnswer, pivot:IAnswer) => { 
//       const q = GetQuestion(t); 
//       const qPivot = GetQuestion(pivot); 
//       // Regroup question by form. 
//       const byForm = JSON.stringify(q?.form) === JSON.stringify(qPivot?.form); 
//       // Regroup question by instruction. 
//       const byInstruction = JSON.stringify(q?.instructions) === JSON.stringify(qPivot?.instructions); 
//       return byForm && byInstruction; 
//     } 
//   } 

//   // Page Break Predicates ============================================= 
//   function PageGrouping() { 
//     return (t:IAnswer, i:number, a:IAnswer[], positive:IAnswer[]) => { 
//       const [pivot] = a; 
//       const q = GetQuestion(t); 
//       const qPivot = GetQuestion(pivot); 
      
//       // Regroup question by form. 
//       const byForm = JSON.stringify(q?.form) === JSON.stringify(qPivot?.form); 
//       // Regroup question by instruction. 
//       const byInstruction = JSON.stringify(q?.instructions) === JSON.stringify(qPivot?.instructions); 
//       // Max 4 question per page. 
//       const pageCap = positive.length < 4; 
//       return byForm && byInstruction && pageCap; 
//     } 
//   } 

//   const TestResetSession = () => { 
//     sessionQuestionnaire.Reset(); 
//   } 

//   return { 
//     TestResetSession, 

//     paging, 
//     questionnaire, setQuestionnaire, 

//     feedbackRef, 

//     AnswersAreComplete, 
//     LoadQuestionnaire, 
//     SubmitQuestionnaire 
//   } 
// }