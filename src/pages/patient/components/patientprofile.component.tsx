import { useContext } from 'react'; 
import { Editor, Reader } from '../../../reusable/_input'; 
import { IsEmpty } from '../../../reusable/_utils'; 
import { PatientContext } from '../patient.page'; 

import { DaoContext } from '../../../reusable/_dao'; 
import { useStateAt } from '../../../reusable/_customhooks';



export function PatientProfile() { 
  const {GetIFields} = useContext(DaoContext); 
  const {profile, CreateUpdateProfile} = useContext(PatientContext); 
  const [ramqIField, firstNameField, lastNameField] = GetIFields('patients', ['ramq', 'firstName', 'lastName']); 
  const btnLabel = !IsEmpty(profile._id) ? 
    'Update patient profile': 
    'Create new patient profile'; 
  
  const [Get, Set] = useStateAt(profile); 
  const {ramq, firstName, lastName} = CollectArgs(['ramq', 'firstName', 'lastName'], Get, Set); 
  

  return <div> 
    <h1>Patient profile</h1> 
    <div>
      <label>Ramq:</label><Reader {...ramq}/> <br/>
      <label>First name:</label><Editor {...firstName}/> <br/>
      <label>Last name:</label><Editor {...lastName}/> <br/>
    </div> 
    <button onClick={() => CreateUpdateProfile(Get())}>{btnLabel}</button> 
  </div> 
}



function CollectArgs( 
    fieldAccessors: string[], 
    Get: (keys?: TKey[] | undefined) => any, 
    Set?: (newValue: any, keys?: TKey[] | undefined) => void) 
{ 
  const {GetIFields, GetIOptions} = useContext(DaoContext); 
  const ifields = GetIFields('patients', fieldAccessors); 
  let args:any = {}; 
  ifields.forEach( ifield => { 
    const value = Get([ifield.accessor]); 
    const setValue = Set ? (newValue:any) => Set(newValue, [ifield.accessor]): undefined; 
    const options = GetIOptions(ifield); 
    args[ifield.accessor] = {ifield, value, setValue, options}; 
  }); 
  return args; 
}



// export function PatientProfile() { 
//   console.log('patient profile'); 
//   const {GetIFields} = useContext(DaoContext); 
//   const {profile, CreateUpdateProfile} = useContext(PatientContext); 
//   const [ramqIField, ...ifields] = GetIFields('patients', ['ramq', 'firstName', 'lastName']); 

//   const [value, setValue] = useState(profile); 

//   const btnLabel = !IsEmpty(profile._id) ? 
//     'Update patient profile': 
//     'Create new patient profile'; 

//   return <div> 
//     <h2>Patient profile</h2> 
//     {JSON.stringify(value)} 
//     <Objx {...{value, ifields}} > 
//       <Field {...{ifield:ramqIField}} >
//         <div><FieldLabel/><FieldReader {...{readerFunc:Reader}} /></div>
//       </Field> 
//       <Fields {...{ifields}} > 
//         <div><FieldLabel/><FieldEditor {...{setValue, editorFunc:Editor}} /></div> 
//       </Fields> 
//     </Objx> 
//     <button onClick={() => CreateUpdateProfile(value)}>{btnLabel}</button>
//   </div> 
// } 
