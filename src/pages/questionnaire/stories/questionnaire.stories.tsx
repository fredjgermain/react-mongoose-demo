import { Story } from '@storybook/react'; 
import { Switch, Route } from 'react-router'; 
import { BrowserRouter } from 'react-router-dom'; 
import { crud } from '../../../libs/dao/stories/mockcrud'; 
import { DaoContexter, DaoContext, ICrud } from '../../../libs/_dao'; 
import { useSession, Session } from '../../../libs/_session'; 

import QuestionnairePage from '../questionnaire.page'; 


import { IsEmpty } from '../../../libs/_utils';
import { useContext } from 'react';


function TemplateComponent({accessors, patient}:{accessors:string[], patient:IPatient}) { 
  return <DaoContexter {...{crud:crud as ICrud, accessors}}> 
    <BrowserRouter> 
      <SimulatePatientSession /> 
    </BrowserRouter> 
  </DaoContexter> 
} 

// {patient}:{patient:IPatient} 
function SimulatePatientSession() { 
  const dao = useContext(DaoContext); 
  const [patient] = dao.GetIEntries('patients'); 
  const sessionProfile = useSession('profile', patient); 
  const ready = !IsEmpty(sessionProfile.Get()?._id); 
  
  return <div> 
    <DebugSessions/>
    {ready && <QuestionnairePage/>} 
  </div> 
}

function DebugSessions() {
  const EndSession = () => { 
    Session.EndSession('profile'); 
    Session.EndSession('questionnaire'); 
  }
  /*
  <DisplaySession session={'profile'}/> 
  <DisplaySession session={'questionnaire'}/> */ 
  return <div>
    
    <button onClick={EndSession}>ResetProfile</button> 
  </div>
}

function DisplaySession({session}:{session:string}) { 
  const value = Session.Get(session); 
  if(Array.isArray(value)) 
    return <div> <div>session:{session}</div>
      {value.map( (v,i) => { 
        return <div key={i}>{JSON.stringify(v)}</div> 
      })} 
    </div> 
  return <div><div>session:{session}</div> {JSON.stringify(value)}</div> 
} 


export default { 
  title: 'Questionnaire/Questionnaire', 
  component: TemplateComponent, 
} 

const Template:Story<{accessors:string[], patient:IPatient}> = args => <TemplateComponent {...args} /> 
export const TestQuestionnairePage = Template.bind({}) 
TestQuestionnairePage.args = { 
  accessors: ['questions', 'patients', 'responses', 'answers', 'forms', 'instructions'], 
  patient: {_id:'1', ramq:'JEAF23118301', firstName:'Fred', lastName:'Jean' } as IPatient, 
} 

