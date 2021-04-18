import { useContext, useState } from 'react'; 
import { DaoContext } from '../../../libs/_dao'; 
import { useSession, Session } from '../../../libs/_session'; 
import { IsEmpty } from '../../../libs/_utils'; 
import { PatientFeedBackRef, usePatientFeedbackRef } from '../components/patient.feedback'; 


export interface IUsePatient { 
  TestResetSession: () => void; 

  profile: IEntry; 
  setProfile: (newValue:any, keys:any[]) => void; 
  ready: boolean; 

  feedbackRef:PatientFeedBackRef; 

  IdentifyPatient: (ramq:string) => void; 
  RamqIsValid: (value:string) => boolean; 
  
  CreateUpdateProfile: (patient: IEntry) => Promise<void>; 
  //CreateUpdateAppointment: (patient: IEntry) => Promise<void>; 
} 


// UsePatient ============================================= 
export function usePatient():IUsePatient { 
  console.log("patient"); 
  const dao = useContext(DaoContext); 

  // Profile session -------------------------------------- 
  const [profile, _setProfile] = useState(Session.Get('profile')); 
  const setProfile = (newValue:any) => { 
    Session.Set('profile', newValue); 
    _setProfile(newValue); 
  }
  
  //const sessionReady = useSession('ready', false); 
  const ready = IsReady(); 
  
  function IsReady() { 
    if(IsEmpty(profile)) 
      return false; 
    return Object.keys(profile).every( k => !IsEmpty(profile[k])) 
  }


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
    //console.log(response);
    if(response.success) { 
      setProfile(response.data); 
    } 
    else { 
      console.log(response.err); 
    } 
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
    setProfile({}); 
    //sessionProfile.Reset(); 
  }

  return { 
    TestResetSession, 

    profile, setProfile, 
    ready, 
    feedbackRef, 
    RamqIsValid, 
    IdentifyPatient, 
    CreateUpdateProfile
  } 
} 