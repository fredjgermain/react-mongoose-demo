import { crud } from '../../../reusable/dao/stories/mockcrud'; 
import { DaoContexter, ICrud } from '../../../reusable/_dao'; 

import PatientPage from '../patient.page'; 


import '../../../css/table.css'; 


function TemplateComponent({accessors}:{accessors:string[]}) { 

  return <DaoContexter {...{crud:crud as ICrud, accessors}} > 
      <PatientPage /> 
  </DaoContexter> 
}

export default { 
  title: 'Patient/Patient', 
  component: TemplateComponent, 
} 

const Template = args => <TemplateComponent {...args} /> 
export const TestPatientPage = Template.bind({}) 
TestPatientPage.args = { 
  accessors: ['questions', 'patients', 'responses', 'answers', 'forms', 'instructions'], 
  patient: {_id:'1', ramq:'', firstName:'', lastName:'' } as IPatient, 
} 

