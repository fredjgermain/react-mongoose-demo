import React from 'react'; 

import {Session, TimeOut, Timer} from './reusable/session/session.class';

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

//let counter = 0; 


function callback() { 
  console.log('Call back'); 
}; 
const duration = 1000; 

export default function App() { 
  
  const timer = new Timer(); 
  timer.Run(); 
  console.log('before timeout'); 

  //window.clearTimeout(timeout); 
  /*const timeout = window.setInterval(callback, duration); 
  window.setTimeout(() => window.clearInterval(timeout), duration); */

  //return <TestLoader/> 

  //const sessionName = "TestSession"; 
  /*const callback = function(){console.log('call back!')}; 
  const duration = 1000;
  var timeout = setTimeout(callback, duration); */

  //const session = new TestTimeOut(callback, duration); 

  
  //clearTimeout(timeout)
  //timeout = window.setTimeout(callback, duration); 

  //Session.Set(sessionName, 12); 
  //console.log(Session.Get(sessionName)) 


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


