import { useContext } from 'react'; 
import { DaoContext } from '../../../reusable/_dao'; 
import { Session, useSession, IUseSession } from '../../../reusable/_session'; 
//import { feedback } from '../../../components/feedback/feedback.component'; 


export interface IUsePatient { 
  TestResetSession: () => void; 

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
  const dao = useContext(DaoContext); 

  // Profile & Appointment session --------------------------------------
  const sessionProfile = useSession('profile', {}); 
  const sessionAppointment = useSession('appointment', {}); 

  const profile = sessionProfile.Get(); 
  const setProfile = (newValue:any, keys:any[] = []) => sessionProfile.Set(newValue, [...keys]); 
  const appointment = sessionAppointment.Get(); 
  const setAppointment = (newValue:any, keys:any[] = []) => sessionAppointment.Set(newValue, [...keys]); 

  // RamqIsValid ------------------------------------------
  function RamqIsValid(value:string) { 
    const [ramqIsValid] = dao.Validate('patients', {ramq:value}); 
    return ramqIsValid; 
  } 

  // IdentifyPatient --------------------------------------
  function IdentifyPatient(ramq:string) { 
    const entries = dao.GetIEntries('patients'); 
    const foundProfile = entries.find( e => { 
      const e_ramq = (e['ramq'] as string); 
      return e_ramq.toLowerCase() === ramq.toLowerCase(); 
    });
    const newProfile = {...dao.GetDefaultIEntry('patients'), ramq}; 
    setProfile(foundProfile ?? newProfile); 
  }

  // CreateUpdateProfile ----------------------------------
  async function CreateUpdateProfile(patient: IEntry) { 
    const [response] = await dao.CreateUpdate('patients', [patient]); 
    //feedback.setValue([response]); 
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
    const [response] = await dao.CreateUpdate('appointments', [appointment]); 
    //feedback.setValue([response]); 
    if(response.success) { 
      setAppointment(response.data); 
      const date = new Date(response.data['date'] as any); 
    } 
    else 
      console.log('appointment failed ...'); 
  } 

  // FindCurrentSession -----------------------------------
  function FindAppointment(patient: IEntry) { 
    const entries = dao.GetIEntries('appointments'); 
    const defaultAppointment = {...dao.GetDefaultIEntry('appointments'), patient:patient._id}; 
    const foundAppointment = entries.find( e => { 
      const e_patient = (e['patient'] as string); 
      return e_patient === patient._id; 
    }); 
    return {...defaultAppointment, ...foundAppointment}; 
  } 


  const TestResetSession = () => {
    sessionProfile.Reset(); 
    sessionAppointment.Reset(); 
  }

  return { 
    TestResetSession, 

    profile, setProfile, 
    appointment, setAppointment, 
    RamqIsValid, 
    IdentifyPatient, 
    CreateUpdateProfile
  } 
} 