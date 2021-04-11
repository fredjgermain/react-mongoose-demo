import { Story } from '@storybook/react'; 
import { PageOfPages, PagerBtn, PagerFromTo } from './pager.component'; 
import { usePage } from '../../_customhooks'; 

import '../../../css/table.css'; 


function TemplateComponent({accessors, patient}:{accessors:string[], patient:IPatient}) { 
  const {} = 


  return <div>

    <PageOfPages {} />

  </div>
} 

export default { 
  title: 'Pager/Pager', 
  component: TemplateComponent, 
} 

const Template:Story<{accessors:string[], patient:IPatient}> = args => <TemplateComponent {...args} /> 
export const TestQuestionnairePage = Template.bind({}) 
TestQuestionnairePage.args = { 
  accessors: ['questions', 'patients', 'responses', 'answers', 'forms', 'instructions'], 
  patient: {_id:'1', ramq:'', firstName:'', lastName:'' } as IPatient, 
} 

