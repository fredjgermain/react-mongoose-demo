import React, {useContext, useEffect} from 'react'; 
import {CrudContexter, CrudContext} from './reusable/_crud'; 
import Nav from './components/nav/nav.component'; 
import {Switch, Route} from 'react-router-dom'; 


// Pages
import Home from './pages/home.page.tsx'; 
import Admin from './pages/admin/admin.page.tsx'; 
import Patient from './pages/patient/patient.page.tsx'; 




const baseUrl = `https://fjg-mongoose-heroku.herokuapp.com/api/`; 


export default function App() { 
  return <CrudContexter {...{baseUrl}}> 
    <Nav/> 
    <PreLoadCollections/> 
    <Switch>
      <Route exact path={'/'} component={Home} />
      <Route path={'/admin'} component={Admin} />
      <Route path={'/patient'} component={Patient} />
    </Switch>
  </CrudContexter> 
} 



function PreLoadCollections() { 
  const {state, Collections, GetICollections} = useContext(CrudContext); 

  useEffect(() => { 
    Collections(['questions','responses', 'forms', 'instructions', 'patients', 'answers']); 
  }, []); 

  const ready = state.ready && state.success; 
  const [forms] = GetICollections(['forms']); 

  return <div> 
    <h1>Test Crud</h1> 
    <div>{forms && forms.entries.length}</div> 
    {!ready && 'loading ...'} 
    {ready && 'ready !'} 
  </div> 
}
