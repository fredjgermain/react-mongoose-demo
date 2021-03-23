import { crud } from '../../../reusable/dao/stories/mockcrud'; 
import { DaoContexter, Preloader, ICrud } from '../../../reusable/_dao'; 

import QuestionnairePage from '../questionnaire.page'; 


import '../../../css/table.css'; 


function TemplateComponent({accessors, patient}:{accessors:string[], patient:IPatient}) { 

  return <DaoContexter crud={crud as ICrud} > 
    <Preloader {...{accessors}}> 
      <QuestionnairePage {...{patient}}/> 
    </Preloader> 
  </DaoContexter> 
}

export default { 
  title: 'Questionnaire/Questionnaire', 
  component: TemplateComponent, 
} 

const Template = args => <TemplateComponent {...args} /> 
export const TestQuestionnairePage = Template.bind({}) 
TestQuestionnairePage.args = { 
  accessors: ['questions', 'patients', 'responses', 'answers', 'forms', 'instructions'], 
  patient: {_id:'1', ramq:'', firstName:'', lastName:'' } as IPatient, 
} 

