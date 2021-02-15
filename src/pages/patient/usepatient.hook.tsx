import {useContext, useState} from 'react'; 
import {useCollectionLoader} from '../../components/preloader.component'; 
import {CrudContext} from '../../reusable/_crud'; 
import { EActionType } from '../../reusable/_dao'; 
import {IsEmpty} from '../../reusable/_utils'; 


export enum EPatientSteps { 
  IDENTIFICATION = 'identification', 
  PROFILING = 'profiling', 
  QUESTIONNAIRE = 'questionnaire', 
} 

export interface IUsePatient { 
  ready: boolean; 
  patientStep: EPatientSteps; 

  questionnaire: IAnswer[]; 
  setQuestionnaire: React.Dispatch<React.SetStateAction<IAnswer[]>>; 
  
  patientProfile: IEntry; 
  setPatientProfile: React.Dispatch<React.SetStateAction<IEntry>>; 
  
  UpdateCreatePatientProfile: () => Promise<void>; 
  IdentifyPatient: (ramq:string) => void; 
  RamqIsValid: (value:string) => boolean; 

  BuildBlankForm: () => void; 
  SubmitQuestionnaire: () => void; 
}
/* Use Patient ============================================
Load necessary collections 
*/
export function usePatient() { 
  const {state, activeEntry, SetActive, Validate, GetICollections, Create, Update} = useContext(CrudContext); 
  const ready = useCollectionLoader(['patients', 'answers', 'questions', 'responses', 'forms', 'instructions']); 

  // Patient Profile
  const [patientProfile, setPatientProfile] = useState({} as IEntry); 

  // Questionnaire
  const [questionnaire, setQuestionnaire] = useState([] as IAnswer[]); 

  // Patient Session
  // ...

  // PatientStep 
  let patientStep = EPatientSteps.IDENTIFICATION; 
  if(!IsEmpty(activeEntry['ramq'])) 
    patientStep = EPatientSteps.PROFILING; 
  if(!IsEmpty(questionnaire)) 
    patientStep = EPatientSteps.QUESTIONNAIRE; 

  // IdentifyPatient() => 
  function IdentifyPatient(ramq:string) { 
    const [patients] = GetICollections(['patients']); 
    const {entries} = patients; 

    const found = entries?.find( e => { 
      const e_ramq = (e['ramq'] as string); 
      return e_ramq.toLowerCase() === ramq.toLowerCase(); 
    }); 
    if(found) { 
      SetActive(EActionType.UPDATE, found); 
    } 
    else { 
      SetActive(EActionType.CREATE, {_id:'', ramq}); 
    } 
  } 

  // RamqIsValid(ramq:string) => 
  function RamqIsValid(value:string) { 
    return Validate('patients', 'ramq', value); 
  } 

  // UpdateCreatePatientProfile () => 
  async function UpdateCreatePatientProfile() { 
    const Func = activeEntry._id ? Update: Create; 
    await Func('patients', [activeEntry]); 
    if(state.success && JSON.stringify(patientProfile) !== JSON.stringify(activeEntry)) { 
      setPatientProfile(activeEntry); 
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
  } 

  // SubmitQuestionnaire () => 
  async function SubmitQuestionnaire () { 
    await Create('answers', questionnaire); 
    if(state.success) 
      console.log("answers have been submitted"); 
  } 

  return {ready, patientStep, 
    questionnaire, setQuestionnaire, 
    patientProfile, setPatientProfile, 

    UpdateCreatePatientProfile, 
    IdentifyPatient, RamqIsValid, 
    BuildBlankForm, SubmitQuestionnaire}; 
}
