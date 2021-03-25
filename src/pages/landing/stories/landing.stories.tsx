import { crud } from '../../../reusable/dao/stories/mockcrud'; 
import { DaoContexter, ICrud } from '../../../reusable/_dao'; 

import LandingPage from '../landing.page'; 


import '../../../css/table.css'; 

function TemplateComponent({accessors}:{accessors:string[]}) { 
  //const loadingComponent = <LandingPage/>; 
  return <LandingPage/> 
  /*return <DaoContexter {...{crud:(crud as ICrud), accessors, loadingComponent}} > 
    <div> main content ... </div> 
  </DaoContexter> */
} 

export default { 
  title: 'Landing/Landing', 
  component: TemplateComponent, 
} 

const Template = args => <TemplateComponent {...args} /> 
export const TestLandingPage = Template.bind({}) 
TestLandingPage.args = { 
  accessors: ['questions', 'patients', 'responses', 'answers', 'forms', 'instructions'], 
} 

