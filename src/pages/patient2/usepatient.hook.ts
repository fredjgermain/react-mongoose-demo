import { useContext } from 'react'; 
import { DaoContext } from '../../reusable/_dao2'; 
import { useSession, IUseSession } from '../../reusable/_session'; 
import { feedback } from '../../components/feedback/feedback2.component'; 


export interface IUsePatient { 
  patientSession: IUseSession; 

  profile: IEntry; 
  setProfile: (newValue:any, keys:any[]) => void; 

  appointment: IEntry; 
  setAppointment: (newValue:any, keys:any[]) => void; 

  IdentifyPatient: (ramq:string) => void; 
  RamqIsValid: (value:string) => boolean; 
  
  CreateUpdateProfile: (patient: IEntry) => Promise<void>; 
  //CreateUpdateAppointment: (patient: IEntry) => Promise<void>; 
} 


// UsePatient ============================================= 
export function usePatient():IUsePatient { 
  const {GetDefaultIEntry, GetIEntries, CreateUpdate, Validate} = useContext(DaoContext); 

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
    const [response] = await CreateUpdate('patients', [patient]); 
    feedback.setValue([response]); 
    if(response.success) { 
      await CreateUpdateAppointment(response.data); 
      setProfile(response.data); 
    } 
    else 
      console.log(response.err); 
  } 

  // CreateUpdateappointment ----------------------------------
  async function CreateUpdateAppointment(patient: IEntry) { 
    const appointment = FindAppointment(patient); 
    const [response] = await CreateUpdate('appointments', [appointment]); 
    if(response.success) { 
      console.log(response.data); 
      setAppointment(response.data); 
      const date = new Date(response.data['date'] as any); 
      console.log([date.getFullYear(), date.getDate(), date.getMonth()+1]); 
    } 
    else 
      console.log('appointment failed ...'); 
  } 

  // FindCurrentSession -----------------------------------
  function FindAppointment(patient: IEntry) { 
    const entries = GetIEntries('appointments'); 
    const defaultAppointment = {...GetDefaultIEntry('appointments'), patient:patient._id}; 
    const foundAppointment = entries.find( e => { 
      const e_patient = (e['patient'] as string); 
      return e_patient === patient._id; 
    }); 
    return {...defaultAppointment, ...foundAppointment}; 
  } 

  return {patientSession, 
  profile, setProfile, 
  appointment, setAppointment, 
  RamqIsValid, 
  IdentifyPatient, 
  CreateUpdateProfile} 
} 