import React from 'react'; 
import {Link, withRouter} from 'react-router-dom'; 


interface INav { 
  history:any; 
  location:any; 
  match:any; 
  staticContext:any; 
} 
function Nav({history}:INav) { 
  console.log(history); 
  return <div> 
    <div> 
      <Link to='' >Home</Link> 
    </div> 
    <div> 
      <Link to='/patient' >Patient</Link> 
    </div> 
    <div> 
      <Link to='/admin' >Admin</Link> 
    </div> 
  </div> 
} 
export default withRouter(Nav);