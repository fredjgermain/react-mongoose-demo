import {useContext} from 'react'; 
import {useCollectionLoader} from '../../components/preloader.component'; 
import {CrudContext} from '../../reusable/_crud'; 
import {useSession, IUseSession} from '../../reusable/_session'; 


export interface IUsePatient { 
  ready: boolean; 

  patientSession: IUseSession; 

  questionnaire: IAnswer[]; 
  setQuestionnaire: (newAnswer:number, keys:any[]) => void; 
  //setQuestionnaire: React.Dispatch<React.SetStateAction<IAnswer[]>>; 
  
  patientProfile: IEntry; 
  setPatientProfile: (newValue:any, keys:any[]) => void; 
  //setPatientProfile: React.Dispatch<React.SetStateAction<IEntry>>; */
  
  UpdateCreatePatientProfile: () => Promise<void>; 
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
  const ready = useCollectionLoader(['patients', 'answers', 'questions', 'responses', 'forms', 'instructions']); 

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
    if(foundProfile) { 
      patientSession.Set(foundProfile, ['patientProfile']); 
      //SetActive(EActionType.UPDATE, foundProfile); 
    } 
    else { 
      const newProfile = {...GetDefaultIEntry('patients'), ramq}; 
      patientSession.Set(newProfile, ['patientProfile']);
      //SetActive(EActionType.CREATE, ); 
    } 
  } 

  // RamqIsValid(ramq:string) => 
  function RamqIsValid(value:string) { 
    return Validate('patients', 'ramq', value); 
  } 

  // UpdateCreatePatientProfile () => 
  async function UpdateCreatePatientProfile() { 
    const Func = patientProfile._id ? Update: Create; 
    await Func('patients', [patientProfile]); 
    if(state.success) { 
      setPatientProfile(patientProfile); 
      BuildBlankForm(); 
    } 
  } 

  // UpdateCreatePatientSession () => 

  // BuildBlankQuestionnaire () => 
  function BuildBlankForm() { 
    const [questions] = GetICollections(['questions']); 
    if(!questions) 
      return [] as IAnswer[]; 
    const blankAnswers = questions.entries.map(q=> { 
      return {_id:'', answer:-1, pid:patientProfile._id, qid:q._id} as IAnswer; 
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

  return {ready, patientSession, 
    patientProfile, setPatientProfile, 
    questionnaire, setQuestionnaire, 
    UpdateCreatePatientProfile, 
    IdentifyPatient, RamqIsValid, 
    BuildBlankForm, SubmitQuestionnaire}; 
}
