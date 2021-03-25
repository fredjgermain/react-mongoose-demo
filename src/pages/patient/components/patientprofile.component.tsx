import { useContext } from 'react'; 
import { Editor } from '../../../components/editor_reader/_editor_reader'; 
import { PatientContext } from '../patient.page'; 

import { DaoContext } from '../../../reusable/_dao'; 
import { useStateAt } from '../../../reusable/_customhooks'; 


export function PatientProfile() { 
  const context = useContext(PatientContext); 
  const {CreateUpdateProfile, ready, TestResetSession} = context; 
  const [Get, Set] = useStateAt({ramq:'', firstName:'', lastName:''}); 
  const {ramq, firstName, lastName} = CollectArgs(['ramq', 'firstName', 'lastName'], Get, Set); 

  return <div> 
    <h1>Patient profile</h1> 
    <div> 
      <div><label>Ramq:</label><Editor {...ramq} /></div> 
      <div><label>First name:</label><Editor {...firstName} /></div> 
      <div><label>Last name:</label><Editor {...lastName} /></div> 
    </div> 
    <button onClick={() => CreateUpdateProfile(Get())}>Save profile</button> 
  </div> 
} 


function CollectArgs( 
    fieldAccessors: string[], 
    Get: (keys?: TKey[] | undefined) => any, 
    Set?: (newValue: any, keys?: TKey[] | undefined) => void) 
{ 
  const dao = useContext(DaoContext); 
  const ifields = dao.GetIFields('patients', fieldAccessors); 
  let args:any = {}; 
  ifields.forEach( ifield => { 
    const value = Get([ifield.accessor]); 
    const editValue = Set ? (newValue:any) => Set(newValue, [ifield.accessor]): undefined; 
    const options = dao.GetIOptions(ifield); 
    args[ifield.accessor] = {ifield, value, editValue, options}; 
  }); 
  return args; 
}

