import { Story } from '@storybook/react'; 
import { Switch, Route } from 'react-router'; 

import { crud } from '../../../libs/dao/stories/mockcrud'; 
import { DaoContexter, ICrud } from '../../../libs/_dao'; 
import PatientPage from '../patient.page'; 
import QuestionnairePage from '../../questionnaire/questionnaire.page'; 
import { BrowserRouter } from 'react-router-dom'; 



function TemplateComponent({accessors}:{accessors:string[]}) { 
  return <DaoContexter {...{crud:crud as ICrud, accessors}} > 
    <BrowserRouter> 
      <Switch> 
        <PatientPage/> 
        <Route path={'/questionnaire'} component={QuestionnairePage} /> 
      </Switch> 
    </BrowserRouter> 
  </DaoContexter> 
} 

export default { 
  title: 'Patient/Patient', 
  component: TemplateComponent, 
} 

const Template:Story<{accessors:string[]}> = args => <TemplateComponent {...args} /> 
export const TestPatientPage = Template.bind({}) 
TestPatientPage.args = { 
  accessors: ['questions', 'patients', 'responses', 'answers', 'forms', 'instructions']
} 

