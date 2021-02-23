import {useContext} from 'react'; 
import {DaoContext} from '../../reusable/_dao2'; 
import {useSession, IUseSession} from '../../reusable/_session'; 



export interface IUsePatient { 
  patientSession: IUseSession; 

  profile: IEntry; 
  setProfile: (newValue:any, keys:any[]) => void; 

  session: IEntry; 
  setSession: (newValue:any, keys:any[]) => void; 

  questionnaire: IAnswer[]; 
  setQuestionnaire: (newAnswer:number, keys:any[]) => void; 

  IdentifyPatient: (ramq:string) => void; 
  RamqIsValid: (value:string) => boolean; 
  
  CreateUpdateProfile: (patient: IEntry) => Promise<void>; 
  CreateUpdateSession: (patient: IEntry) => Promise<void>; 

  BuildBlankForm: (session:IEntry) => void; 
  SubmitQuestionnaire: () => void; 
} 


// UsePatient ============================================= 
export function usePatient():IUsePatient { 
  const {GetDefaultIEntry, GetIEntries, Create, Update, Validate} = useContext(DaoContext); 

  // Patient session --------------------------------------
  const sessionInitValue = {profile:{} as IEntry, session:{} as IEntry, questionnaire:[] as IAnswer[]}; 
  const patientSession = useSession('patient', sessionInitValue); 
  if(!patientSession.Get()) 
    patientSession.Set(sessionInitValue) 
  
  const profile = patientSession.Get(['profile']); 
  const setProfile = (newValue:any, keys:any[] = []) => patientSession.Set(newValue, ['profile', ...keys]); 
  const session = patientSession.Get(['session']); 
  const setSession = (newValue:any, keys:any[] = []) => patientSession.Set(newValue, ['session', ...keys]); 
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
    setProfile(foundProfile ?? newProfile); 
  }

  // CreateUpdateProfile ----------------------------------
  async function CreateUpdateProfile(patient: IEntry) { 
    const EditFunc = patient._id ? Update: Create; 
    const [response] = await EditFunc('patients', [patient]); 
    if(response.success) 
      await CreateUpdateSession(response.data); 
    else 
      console.log(response.err); 
  } 

  // CreateUpdateSession ----------------------------------
  async function CreateUpdateSession(patient: IEntry) { 
    let currentSession = FindCurrentSession(patient); 
    if(!currentSession) { 
      const newSession = {...GetDefaultIEntry('sessions'), patient:patient._id}; 
      const [response] = await Create('sessions', [newSession]); 
      if(response.success) 
        currentSession = response.data; 
    } 
    if(!currentSession) { 
      console.log('session failed ...'); 
      return; 
    } 
    setSession(currentSession); 
    const questionnaire = BuildBlankForm(currentSession); 
    setQuestionnaire(questionnaire); 
  } 

  // FindCurrentSession -----------------------------------
  function FindCurrentSession(patient: IEntry) { 
    const entries = GetIEntries('sessions'); 
    return entries.find( e => { 
      const e_patient = (e['patient'] as string); 
      return e_patient === patient._id; 
    }); 
  } 

  // BlankQuestionnaire -----------------------------------
  function BuildBlankForm(session:IEntry) { 
    const entries = GetIEntries('questions'); 
    return entries.map(q=> { 
      return {_id:'', session:profile._id, question:q._id, answer:-1} as IAnswer; 
    }); 
  } 

  // SubmitQuestionnaire ----------------------------------
  async function SubmitQuestionnaire() { 

  } 

  return {patientSession, 
  profile, setProfile, 
  session, setSession, 
  questionnaire, setQuestionnaire, 
  RamqIsValid, 
  IdentifyPatient, 
  CreateUpdateProfile, 
  CreateUpdateSession, 
  BuildBlankForm, 
  SubmitQuestionnaire} 
} 