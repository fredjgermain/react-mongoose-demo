import { useContext } from 'react'; 
import { DaoContext } from '../../../reusable/_dao'; 
import { useSession } from '../../../reusable/_session'; 
import { PatientFeedBackRef, usePatientFeedbackRef } from '../components/patient.feedback'; 


export interface IUsePatient { 
  TestResetSession: () => void; 

  profile: IEntry; 
  setProfile: (newValue:any, keys:any[]) => void; 

  feedbackRef:PatientFeedBackRef; 

  IdentifyPatient: (ramq:string) => void; 
  RamqIsValid: (value:string) => boolean; 
  
  CreateUpdateProfile: (patient: IEntry) => Promise<void>; 
  //CreateUpdateAppointment: (patient: IEntry) => Promise<void>; 
} 


// UsePatient ============================================= 
export function usePatient():IUsePatient { 
  const dao = useContext(DaoContext); 

  // Profile session --------------------------------------
  const sessionProfile = useSession('profile', {}); 
  const sessionAppointment = useSession('appointment', {}); 

  const profile = sessionProfile.Get(); 
  const setProfile = (newValue:any, keys:any[] = []) => sessionProfile.Set(newValue, [...keys]); 

  const feedbackRef = usePatientFeedbackRef(); 

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
    feedbackRef.current.Set(response); 
    if(response.success) { 
      setProfile(response.data); 
    } 
    else 
      console.log(response.err); 
  } 

  // CreateUpdateappointment ----------------------------------
  /*async function CreateUpdateAppointment(patient: IEntry) { 
    const appointment = FindAppointment(patient); 
    const [response] = await dao.CreateUpdate('appointments', [appointment]); 
    //feedback.setValue([response]); 
    if(response.success) { 
      setAppointment(response.data); 
      const date = new Date(response.data['date'] as any); 
    } 
    else 
      console.log('appointment failed ...'); 
  } */

  // FindCurrentSession -----------------------------------
  /*function FindAppointment(patient: IEntry) { 
    const entries = dao.GetIEntries('appointments'); 
    const defaultAppointment = {...dao.GetDefaultIEntry('appointments'), patient:patient._id}; 
    const foundAppointment = entries.find( e => { 
      const e_patient = (e['patient'] as string); 
      return e_patient === patient._id; 
    }); 
    return {...defaultAppointment, ...foundAppointment}; 
  } */


  const TestResetSession = () => {
    sessionProfile.Reset(); 
    sessionAppointment.Reset(); 
  }

  return { 
    TestResetSession, 

    profile, setProfile, 
    feedbackRef, 
    RamqIsValid, 
    IdentifyPatient, 
    CreateUpdateProfile
  } 
} 