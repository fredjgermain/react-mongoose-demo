import { Story } from '@storybook/react'; 
import { useState } from 'react';
import { Switch, Route, Redirect } from 'react-router'; 
import { Redirection } from './redirector.component';

import { BrowserRouter } from 'react-router-dom'; 

function Page1() { 
  const [condition, setValue] = useState(false); 
  return <div>
    Pager 1
    <button onClick={() => setValue(true)} >Redirect to page2</button> 
    <Redirection  {...{condition, destination:"page2"}} /> 
  </div> 
}

function Page2() { 
  return <div>Pager 2</div> 
}


function TemplateComponent() { 
  return <BrowserRouter> 
      <Switch> 
        <Page1/> 
        <Route path={'/page1'} component={Page1} /> 
        <Route path={'/page2'} component={Page2} /> 
      </Switch> 
    </BrowserRouter> 
} 

export default { 
  title: 'Redirection/Redirection', 
  component: TemplateComponent, 
} 

const Template:Story<any> = args => <TemplateComponent {...args} /> 
export const TestRedirection = Template.bind({}) 
TestRedirection.args = {} 

