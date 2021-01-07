import React from 'react'; 
import {Switch, Route} from 'react-router-dom'; 
import Nav from './components/nav/nav.component'; 
import Home from './pages/home.page'; 
import Patient from './pages/patient/patient.page'; 
import Admin from './pages/admin/admin.page'; 
import Experiments from './pages/experiments/experiments'; 


export default function App() { 
  //type test = Input_Object.; 

  return <Experiments />
  //return <AdminSection/> 
  /*return <div> 
  <Nav/> 
  <Switch> 
    <Route exact path='/' component={Home} /> 
    <Route path='/patient' component={Patient} /> 
    <Route path='/admin' component={Admin} /> 
  </Switch> 
  </div> */
} 

//export default App;
