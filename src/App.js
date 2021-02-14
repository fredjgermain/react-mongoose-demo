import React from 'react'; 

import {TestLoader} from './experiments/testLoader/testLoader'; 
//import {TestSelect} from './reusable/components/select/select.component'; 

import {CrudContexter} from './reusable/_crud'; 
import Nav from './components/nav/nav.component'; 
import {Switch, Route} from 'react-router-dom'; 
import {PreLoader} from './components/preloader.component'; 

// Pages
import Home from './pages/home/home.page.tsx'; 
import Admin from './pages/admin/admin.page.tsx'; 
import Patient from './pages/patient/patient.page.tsx'; 

const baseUrl = `https://fjg-mongoose-heroku.herokuapp.com/api/`; 



export default function App() { 
  //return <TestLoader/> 

  return <CrudContexter {...{baseUrl}}> 
    <div> ---- NAV ... </div> 
    <Nav/> 
    <div> ---- Preloader ... </div> <br/>
    <PreLoader/> 
    <h1> h1 title ... </h1> 
    <Switch> 
      <Route exact path={'/'} component={Home} /> 
      <Route path={'/admin'} component={Admin} /> 
      <Route path={'/patient'} component={Patient} /> 
    </Switch> 
    <br/> 
    <div> 
      Footer 
    </div> 
    <br/> 
  </CrudContexter> 
} 


