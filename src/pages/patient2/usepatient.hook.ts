import {useContext} from 'react'; 
import {DaoContext} from '../../reusable/_dao2'; 
import {useSession, IUseSession} from '../../reusable/_session'; 



export interface IUsePatient { 
  patientSession: IUseSession; 

  profile: IEntry; 
  setProfile: (newValue:any, keys:any[]) => void; 

  appointment: IEntry; 
  setAppointment: (newValue:any, keys:any[]) => void; 

  IdentifyPatient: (ramq:string) => void; 
  RamqIsValid: (value:string) => boolean; 
  
  CreateUpdateProfile: (patient: IEntry) => Promise<void>; 
  CreateUpdateSession: (patient: IEntry) => Promise<void>; 
} 


// UsePatient ============================================= 
export function usePatient():IUsePatient { 
  const {GetDefaultIEntry, GetIEntries, Create, Update, Validate} = useContext(DaoContext); 

  // Patient session --------------------------------------
  const sessionInitValue = {profile:{} as IEntry, appointment:{} as IEntry}; 
  const patientSession = useSession('patient', sessionInitValue); 
  if(!patientSession.Get()) 
    patientSession.Set(sessionInitValue) 
  
  const profile = patientSession.Get(['profile']); 
  const setProfile = (newValue:any, keys:any[] = []) => patientSession.Set(newValue, ['profile', ...keys]); 
  const appointment = patientSession.Get(['appointment']); 
  const setAppointment = (newValue:any, keys:any[] = []) => patientSession.Set(newValue, ['appointment', ...keys]); 


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
      await CreateUpdateAppointment(response.data); 
    else 
      console.log(response.err); 
  } 

  // CreateUpdateappointment ----------------------------------
  async function CreateUpdateAppointment(patient: IEntry) { 
    let currentAppointment = FindCurrentAppointment(patient); 
    if(!currentAppointment) { 
      const newSession = {...GetDefaultIEntry('appointments'), patient:patient._id}; 
      const [response] = await Create('appointments', [newSession]); 
      if(response.success) 
        currentAppointment = response.data; 
    } 
    if(!currentAppointment) { 
      console.log('session failed ...'); 
      return; 
    } 
    setAppointment(currentAppointment); 
    // setProfileFlag to true; ?? 
  } 

  // FindCurrentSession -----------------------------------
  function FindCurrentAppointment(patient: IEntry) { 
    const entries = GetIEntries('appointments'); 
    return entries.find( e => { 
      const e_patient = (e['patient'] as string); 
      return e_patient === patient._id; 
    }); 
  } 

  return {patientSession, 
  profile, setProfile, 
  appointment: appointment, setAppointment: setAppointment, 
  RamqIsValid, 
  IdentifyPatient, 
  CreateUpdateProfile, 
  CreateUpdateSession: CreateUpdateAppointment} 
} 