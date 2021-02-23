import {useContext} from 'react'; 
import {CrudContext} from '../../reusable/_crud'; 
import {useSession, IUseSession} from '../../reusable/_session'; 


/* 
After Creating/Updating profile 
- Create session to db 
  patient: patient 
  date: Date 

[Answer] 
  -session: Session 
  -question: Question 
  -answer: Number 
*/ 


export interface IUsePatient { 
  ready: boolean; 

  patientSession: IUseSession; 

  questionnaire: IAnswer[]; 
  setQuestionnaire: (newAnswer:number, keys:any[]) => void; 
  //setQuestionnaire: React.Dispatch<React.SetStateAction<IAnswer[]>>; 
  
  patientProfile: IEntry; 
  setPatientProfile: (newValue:any, keys:any[]) => void; 
  //setPatientProfile: React.Dispatch<React.SetStateAction<IEntry>>; */
  
  UpdateCreateProfile: (patient: IEntry) => Promise<void>; 
  UpdateCreateSession: (patient: IEntry) => Promise<void>;  

  IdentifyPatient: (ramq:string) => void; 
  RamqIsValid: (value:string) => boolean; 

  BuildBlankForm: () => void; 
  SubmitQuestionnaire: () => void; 
}
/* Use Patient ============================================
Load necessary collections 
*/
export function usePatient():IUsePatient { 
  const {state, Validate, GetDefaultIEntry, GetICollections, Create, Update} = useContext(CrudContext); 

  console.log((state.response as ICrudResponse)) 

  // Patient session
  const sessionInitValue = {patientProfile:{} as IEntry, questionnaire:[] as IAnswer[]}; 
  const patientSession = useSession('patientSession', sessionInitValue); 
  if(!patientSession.Get()) 
    patientSession.Set(sessionInitValue) 
  
  const patientProfile = patientSession.Get(['patientProfile']); 
  const setPatientProfile = (newValue:any, keys:any[] = []) => patientSession.Set(newValue, ['patientProfile', ...keys]); 
  const questionnaire = patientSession.Get(['questionnaire']); 
  const setQuestionnaire = (newValue:any, keys:any[] = []) => patientSession.Set(newValue, ['questionnaire', ...keys]); 


  // IdentifyPatient() => 
  function IdentifyPatient(ramq:string) { 
    const [patients] = GetICollections(['patients']); 
    const {entries} = patients; 

    const foundProfile = entries?.find( e => { 
      const e_ramq = (e['ramq'] as string); 
      return e_ramq.toLowerCase() === ramq.toLowerCase(); 
    }); 
    const newProfile = {...GetDefaultIEntry('patients'), ramq}; 
    setPatientProfile(foundProfile ?? newProfile); 
  } 

  // RamqIsValid(ramq:string) => 
  function RamqIsValid(value:string) { 
    return Validate('patients', 'ramq', value); 
  } 

  // UpdateCreatePatientProfile () => 
  async function UpdateCreateProfile(newPatient:IEntry) { 
    const Func = newPatient._id ? Update: Create; 
    await Func('patients', [newPatient]); 
  } 

  async function UpdateCreateSession(patient:IEntry) { 
    // Problem with _id when creating profile ?? 
    const today = new Date(); 
    const year = today.getFullYear(); // year 
    const month = today.getUTCMonth()+1; // month 
    const day = today.getDate(); // today 
    const date = `${year}/${month}/${day}`; 
    const session = {_id:'', patient, date}; 
    await Create('sessions', [session]); 
    if(state.success) { 
      //await Read('sessions'); 
      
      //BuildBlankForm(); 
    } 
  }

  // BuildBlankQuestionnaire () => 
  function BuildBlankForm() { 
    const [questions] = GetICollections(['questions']); 
    if(!questions) 
      return [] as IAnswer[]; 
    const blankAnswers = questions.entries.map(q=> { 
      return {_id:'', answer:-1, pid:patientProfile._id, qid:q._id} as IEntry; 
    }); 
    setQuestionnaire(blankAnswers); 
    //patientSession.Set(blankAnswers, ['questionnaire']); 
  } 

  // SubmitQuestionnaire () => 
  async function SubmitQuestionnaire () { 
    await Create('answers', questionnaire); 
    if(state.success) 
      console.log("answers have been submitted"); 
  } 

  return {ready:state.success, patientSession, 
    patientProfile, setPatientProfile, 
    questionnaire, setQuestionnaire, 
    UpdateCreateProfile, 
    UpdateCreateSession, 
    IdentifyPatient, RamqIsValid, 
    BuildBlankForm, SubmitQuestionnaire}; 
}
