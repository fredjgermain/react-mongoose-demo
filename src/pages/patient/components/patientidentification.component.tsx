import { useContext } from 'react'; 
import { Editor } from '../../../reusable/_input'; 
import { PatientContext } from '../patient.page'; 

import { DaoContext } from '../../../reusable/_dao'; 
import { useStateAt } from '../../../reusable/_customhooks';



export function PatientIdentification () { 
  const dao = useContext(DaoContext); 
  const {RamqIsValid, IdentifyPatient} = useContext(PatientContext); 
  const [ifield] = dao.GetIFields('patients', ['ramq']); 

  const [Get, Set] = useStateAt(dao.GetDefaultIEntry('patients')); 
  const value = Get(['ramq']); 
  const setValue = (newValue:any) => Set(newValue, ['ramq']); 

  return <div> 
    <h1>Patient identification</h1> 
    <div>
      <label>Ramq:</label><Editor {...{value, setValue, ifield}}/>
      <span>{RamqIsValid(value) ? '✓' : 'x'}</span> 
    </div> 
    <button onClick={() => IdentifyPatient(value)}>Identify</button> 
  </div> 
}




// Patient Identification 
/*export function PatientIdentification() { 
  const {GetIFields, GetDefaultIEntry} = useContext(DaoContext); 
  const {RamqIsValid, IdentifyPatient} = useContext(PatientContext); 
  const [ramqIField] = GetIFields('patients', ['ramq']); 

  const [value, setValue] = useState(GetDefaultIEntry('patients')); 
  const ramq = GetValueAt(value, [ramqIField.accessor]); 

  return <div> 
    <h2>Patient identification</h2> 
    {JSON.stringify(value)} 
    <Objx {...{value, ifields:[ramqIField]}} > 
      <Field {...{ifield:ramqIField}}> 
        <div> 
          <FieldLabel/><FieldEditor {...{setValue, editorFunc:Editor}} /> 
          <span>{RamqIsValid(ramq) ? '✓' : 'x'}</span> 
        </div> 
      </Field> 
    </Objx> 
    <button onClick={() => IdentifyPatient(ramq)}>Identify</button> 
  </div> 
}
*/