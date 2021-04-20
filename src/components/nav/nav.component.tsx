import {Link, withRouter} from 'react-router-dom'; 

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
      <div><Link to=''>Home Page</Link></div> 
      <div><Link to='/patient'>Patient Section</Link></div> 
      <div><Link to='/admin'>Admin Section</Link></div> 
      <div><Link to='/answers'>Answers Section</Link></div> 
    </div> 
  </nav> 
} 
export default withRouter(Nav);