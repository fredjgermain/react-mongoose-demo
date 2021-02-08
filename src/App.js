import React from 'react'; 

import {TestArrayUtil} from './experiments/testarray/testarrayutils.experiment';
import {TestRenderer} from './experiments/renderer/testrender';

import {CrudContexter} from './reusable/_crud'; 
import Nav from './components/nav/nav.component'; 
import {Switch, Route} from 'react-router-dom'; 
import {PreLoader} from './components/predloader.component'; 

// Pages
import Home from './pages/home/home.page.tsx'; 
import Admin from './pages/admin/admin.page.tsx'; 
import Patient from './pages/patient/patient.page.tsx'; 

const baseUrl = `https://fjg-mongoose-heroku.herokuapp.com/api/`; 

export default function App() { 
  //return <TestRenderer/>
  return <TestArrayUtil/>


  return <CrudContexter {...{baseUrl}}> 
    <Nav/> 
    <PreLoader/> 
    <Switch>
      <Route exact path={'/'} component={Home} />
      <Route path={'/admin'} component={Admin} />
      <Route path={'/patient'} component={Patient} />
    </Switch>
  </CrudContexter> 
} 


