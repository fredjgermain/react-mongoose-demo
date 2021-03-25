import { Story } from '@storybook/react'; 
import { crud } from '../../../reusable/dao/stories/mockcrud'; 
import { DaoContexter, ICrud } from '../../../reusable/_dao'; 
import { useSession, Session } from '../../../reusable/_session'; 

import QuestionnairePage from '../questionnaire.page'; 


import '../../../css/table.css'; 


function TemplateComponent({accessors, patient}:{accessors:string[], patient:IPatient}) { 
  const sessionProfile = useSession('profile', patient); 
  //sessionProfile.Set(patient); 
  //Session.Set('profile', {}); 
  //Session.Set('questionnaire', []); 
  return <DaoContexter {...{crud:crud as ICrud, accessors}}> 
    {JSON.stringify(Session.Get('profile'))} <br/> 
    {JSON.stringify(Session.Get('questionnaire'))} <br/> 
    <button onClick={() => sessionProfile.Set({})}>ResetProfile</button> 
    <QuestionnairePage/> 
  </DaoContexter> 
} 

export default { 
  title: 'Questionnaire/Questionnaire', 
  component: TemplateComponent, 
} 

const Template:Story<{accessors:string[], patient:IPatient}> = args => <TemplateComponent {...args} /> 
export const TestQuestionnairePage = Template.bind({}) 
TestQuestionnairePage.args = { 
  accessors: ['questions', 'patients', 'responses', 'answers', 'forms', 'instructions'], 
  patient: {_id:'1', ramq:'', firstName:'', lastName:'' } as IPatient, 
} 

