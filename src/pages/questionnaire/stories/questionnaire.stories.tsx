import { crud } from '../../../reusable/dao/stories/mockcrud'; 
import { DaoContexter, ICrud } from '../../../reusable/_dao'; 
import { useSession } from '../../../reusable/_session'; 

import QuestionnairePage from '../questionnaire.page'; 


import '../../../css/table.css'; 


function TemplateComponent({accessors, patient}:{accessors:string[], patient:IPatient}) { 
  const sessionProfile = useSession('profile', patient); 
  return <DaoContexter {...{crud:crud as ICrud, accessors}} > 
    <QuestionnairePage/> 
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

