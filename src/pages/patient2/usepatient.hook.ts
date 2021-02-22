import {useContext} from 'react'; 
import {DaoContext} from '../../reusable/_dao2'; 
import {useSession, IUseSession} from '../../reusable/_session'; 



export interface IUsePatient { 
  patientSession: IUseSession; 

  profile: IEntry; 
  setProfile: (newValue:any, keys:any[]) => void; 

  questionnaire: IAnswer[]; 
  setQuestionnaire: (newAnswer:number, keys:any[]) => void; 

  IdentifyPatient: (ramq:string) => void; 
  RamqIsValid: (value:string) => boolean; 
  
  CreateUpdateProfile: (patient: IEntry) => Promise<void>; 
  CreateUpdateSession: (patient: IEntry) => Promise<void>; 

  BuildBlankForm: () => void; 
  SubmitQuestionnaire: () => void; 
} 


// UsePatient ============================================= 
export function usePatient():IUsePatient { 
  const {GetDefaultIEntry, GetIEntries, Create, Update, Validate} = useContext(DaoContext); 

  // Patient session --------------------------------------
  const sessionInitValue = {patientProfile:{} as IEntry, questionnaire:[] as IAnswer[]}; 
  const patientSession = useSession('patientSession', sessionInitValue); 
  if(!patientSession.Get()) 
    patientSession.Set(sessionInitValue) 
  
  const patientProfile = patientSession.Get(['patientProfile']); 
  const setPatientProfile = (newValue:any, keys:any[] = []) => patientSession.Set(newValue, ['patientProfile', ...keys]); 
  const questionnaire = patientSession.Get(['questionnaire']); 
  const setQuestionnaire = (newValue:any, keys:any[] = []) => patientSession.Set(newValue, ['questionnaire', ...keys]); 


  // RamqIsValid ------------------------------------------
  function RamqIsValid(value:string) { 
    return Validate('patients', 'ramq', value); 
  } 

  // IdentifyPatient --------------------------------------
  function IdentifyPatient(ramq:string) { 
    const entries = GetIEntries('patients'); 
    const foundProfile = entries.find( e => { 
      const e_ramq = (e['ramq'] as string); 
      return e_ramq.toLowerCase() === ramq.toLowerCase(); 
    });
    const newProfile = {...GetDefaultIEntry('patients'), ramq}; 
    setPatientProfile(foundProfile ?? newProfile); 
  }

  // CreateUpdateProfile ----------------------------------
  async function CreateUpdateProfile(patient: IEntry) { 
    const EditFunc = patient._id ? Update: Create; 
    await EditFunc('patients', [patient]); 
    
  } 

  // CreateUpdateSession ----------------------------------
  async function CreateUpdateSession(patient: IEntry) { 

  } 

  // BlankQuestionnaire -----------------------------------
  function BuildBlankForm() {}

  // SubmitQuestionnaire ----------------------------------
  function SubmitQuestionnaire() {} 

  return {patientSession, 
  profile: patientProfile, setProfile: setPatientProfile, 
  questionnaire, setQuestionnaire, 
  RamqIsValid, 
  IdentifyPatient, 
  CreateUpdateProfile, 
  CreateUpdateSession, 
  BuildBlankForm, 
  SubmitQuestionnaire} 
} 