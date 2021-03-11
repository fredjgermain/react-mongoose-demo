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
    <div>{JSON.stringify(history)}</div> 
    <div>
      <span> 
        <Link to='' >Home</Link> 
      </span> 
      <span> 
        <Link to='/patient' >Patient</Link> 
      </span> 
      <span> 
        <Link to='/admin' >Admin</Link> 
      </span> 
    </div>
  </div> 
} 
export default withRouter(Nav);