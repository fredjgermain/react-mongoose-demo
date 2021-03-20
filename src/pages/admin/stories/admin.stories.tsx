import { crud } from '../../../reusable/dao/stories/mockcrud'; 
import { DaoContext, DaoContexter, Preloader, ICrud } from '../../../reusable/_dao'; 


import React, { useContext } from 'react'; 
import { IUseAdmin, useAdmin } from '../hooks/useadmin.hook'; 
import { IsEmpty } from '../../../reusable/_utils'; 

import { CollectionSelector } from '../components/collectionselector.component'; 
import { AdminRow } from '../components/adminrow.component'; 
import { Header } from '../components/header.component'; 
import { PagerFromTo, PageOfPages, PagerBtn } from '../../../reusable/_pager';

import '../../../css/table.css'; 
//import { Feedback } from '../../../components/feedback/feedback.component';


const AdminContext = React.createContext({} as IUseAdmin); 
function TemplateComponent({accessors}:{accessors:string[]}) { 
  return <DaoContexter crud={crud as ICrud} > 
    <Preloader {...{accessors}}> 
      <AdminPage/> 
    </Preloader> 
  </DaoContexter> 
}


function AdminPage() { 
  const context = useAdmin(); 

  return <AdminContext.Provider value={context} > 
    <CollectionSelector/> 
  </AdminContext.Provider> 
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

