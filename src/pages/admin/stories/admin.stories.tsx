import { Story } from '@storybook/react'; 
import { crud } from '../../../libs/dao/stories/mockcrud'; 
import { DaoContexter, ICrud } from '../../../libs/_dao'; 
import AdminPage from '../admin.page'; 


function TemplateComponent({...props}:{accessors:string[]}) { 
  return <DaoContexter {...{crud:crud as ICrud, accessors:props.accessors}}> 
    <AdminPage/> 
  </DaoContexter> 
} 

export default { 
  title: 'Admin/Admin', 
  component: TemplateComponent, 
} 

const Template:Story<{accessors:string[]}> = (args) => <TemplateComponent {...args} /> 

export const TestAdminPage = Template.bind({}) 
TestAdminPage.args = { 
  accessors: ['questions', 'patients', 'responses', 'answers', 'forms', 'instructions'], 
} 