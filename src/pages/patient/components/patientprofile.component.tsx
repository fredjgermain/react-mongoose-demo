import { useContext } from 'react'; 
import { Editor, IEditor } from '../../../libs/editor_reader/_editor_reader'; 
import { PatientContext } from '../patient.page'; 

import { DaoContext } from '../../../libs/_dao'; 
import { useStateAt } from '../../../libs/_customhooks'; 


export function PatientProfile() { 
  const context = useContext(PatientContext); 
  const {CreateUpdateProfile} = context; 
  const [Get, Set] = useStateAt({ramq:'', firstName:'', lastName:''}); 
  const {ramq, firstName, lastName} = CollectArgs(['ramq', 'firstName', 'lastName'], Get, Set); 

  return <div className={'borderedform'}> 
    <div><label>Ramq:</label><Editor {...{...ramq, sizeFunc:() => 13}} /></div> 
    <div><label>First name:</label><Editor {...{...firstName, sizeFunc:() => 20}} /></div> 
    <div><label>Last name:</label><Editor {...{...lastName, sizeFunc:() => 20}} /></div> 
    <br/> 
    <button onClick={() => CreateUpdateProfile(Get())}>Save</button> 
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

