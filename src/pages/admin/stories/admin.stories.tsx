import React, { useContext } from 'react'; 
import { Story } from '@storybook/react'; 

import { crud } from '../../../libs/dao/stories/mockcrud'; 
import { DaoContexter, ICrud } from '../../../libs/_dao'; 

import AdminPage from '../admin.page'; 


export default { 
  title: 'Admin/admin2', 
  component: TemplateComponent, 
} 


function TemplateComponent() { 
  const accessors = ['questions', 'patients', 'responses', 'answers', 'forms', 'instructions']; 
  return <DaoContexter {...{crud:crud as ICrud, accessors}}> 
    <AdminPage /> 
  </DaoContexter> 
    
} 

const Template:Story<{}> = (args) => <TemplateComponent {...args} /> 

export const TestTabler = Template.bind({}) 
TestTabler.args = {}