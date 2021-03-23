import { crud } from '../../../reusable/dao/stories/mockcrud'; 
import { DaoContexter, Preloader, ICrud } from '../../../reusable/_dao'; 

import PatientPage from '../patient.page'; 


import '../../../css/table.css'; 


function TemplateComponent({accessors, patient}:{accessors:string[], patient:IPatient}) { 

  return <DaoContexter crud={crud as ICrud} > 
    <Preloader {...{accessors}}> 
      <PatientPage /> 
    </Preloader> 
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

