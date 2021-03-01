import React, { useContext, useState } from 'react'; 
import Nav from './components/nav/nav.component'; 
import { Switch, Route } from 'react-router-dom'; 
import { DaoContexter } from './reusable/_dao2'; 
import { usePreloadCollections } from './components/preloader.component'; 
import {TestArrayUtil} from './experiments/testarray/testarrayutils.experiment'; 


// Pages
import Home from './pages/home/home.page.tsx'; 
//import Admin from './pages/admin/admin.page.tsx'; 
import PatientPage from './pages/patient2/patient.page.tsx'; 
import { Feedback } from './components/feedback/feedback2.component';

const baseUrl = `https://fjg-mongoose-heroku.herokuapp.com/api/`; 

//<Route path={'/admin'} component={Admin} /> 

export default function App() { 
  return <DaoContexter {...{baseUrl}}> 
    <div> ---- NAV ... </div> 
    <Nav/> 
    <div> ---- Preloader ... </div> <br/> 
    <h1> h1 title ... </h1> 
    <MainSection/> 
    <br/> 
    <div> 
      Footer 
    </div> 
    <br/> 
  </DaoContexter> 
} 



function MainSection() {
  const ready = usePreloadCollections(); 

  /*const testDate = new Date(); 
  console.log(testDate); */

  return <div> 
    {!ready && <span>Loading ... </span>} 
    <Feedback/> 
    {ready && <Switch> 
      <Route exact path={'/'} component={Home} /> 
      <Route path={'/patient'} component={PatientPage} /> 
    </Switch> 
    } 
  </div> 
} 