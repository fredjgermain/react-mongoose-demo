import {Link, withRouter} from 'react-router-dom'; 

import '../../css/nav.css'; 

interface INav { 
  history:any; 
  location:any; 
  match:any; 
  staticContext:any; 
} 
function Nav({history}:INav) { 
  console.log(history); 
  return <nav> 
    <div> 
      <span>Home<Link to='' >Home Page</Link></span> 
      <span><Link to='/patient' >Patient Section</Link></span> 
      <span><Link to='/admin' >Admin Section</Link> </span> 
    </div> 
  </nav> 
} 
export default withRouter(Nav);