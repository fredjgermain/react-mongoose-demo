import {useContext} from 'react'; 
import {DaoContext} from '../../reusable/_dao2'; 
import {useSession, Session} from '../../reusable/_session'; 



export interface IUseQuestionnaire { 
  questionnaire: IAnswer[]; 
  setQuestionnaire: (newAnswer:number, keys:any[]) => void; 

  InitQuestionnaire: (session:IEntry) => void; 
  SubmitQuestionnaire: () => void; 
} 


export function useQuestionnaire() { 
  const {GetDefaultIEntry, GetIEntries, Create, Update, Validate} = useContext(DaoContext); 
  const appointment = Session.Get( 'patient', ['appointment']); 
  
  const sessionInitValue = {questionnaire:[] as IAnswer[]}; 
  const questionnaireSession = useSession('questionnaire', sessionInitValue); 
  if(!questionnaireSession.Get()) 
    questionnaireSession.Set(sessionInitValue) 
  
  const questionnaire = questionnaireSession.Get(['questionnaire']); 
  const setQuestionnaire = (newValue:any, keys:any[] = []) => questionnaireSession.Set(newValue, ['questionnaire', ...keys]); 

  async function CreateUpdate() { 
    
  }

  // BlankQuestionnaire -----------------------------------
  async function InitQuestionnaire(appointment:IEntry) { 
    const entries = GetIEntries('questions'); 
    /*const blankAnswers = entries.map(q=> { 
      return {_id:'', appointment:appointment._id, question:q._id, answer:-1} as IAnswer; 
    }); */
    //const response = await Create('answers', blankAnswers); 
    //console.log(response); 
  } 

  // SubmitQuestionnaire ----------------------------------
  async function SubmitQuestionnaire(answers:IEntry[]) { 
    const response = await Update('answers', answers); 
    console.log(response); 
  } 

  return {
    questionnaire, setQuestionnaire, 
    InitQuestionnaire, 
    SubmitQuestionnaire
  }
}