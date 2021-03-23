import { crud } from '../../../reusable/dao/stories/mockcrud'; 
import { DaoContexter, Preloader, ICrud } from '../../../reusable/_dao'; 
import AdminPage from '../admin.page'; 

import '../../../css/table.css'; 

function TemplateComponent({accessors}:{accessors:string[]}) { 
  return <DaoContexter crud={crud as ICrud} > 
    <Preloader {...{accessors}}> 
      <AdminPage/> 
    </Preloader> 
  </DaoContexter> 
}

export default { 
  title: 'Admin/Admin', 
  component: TemplateComponent, 
} 

const Template = args => <TemplateComponent {...args} /> 
export const TestAdminPage = Template.bind({}) 
TestAdminPage.args = { 
  accessors: ['questions', 'patients', 'responses', 'answers', 'forms', 'instructions'], 
} 
