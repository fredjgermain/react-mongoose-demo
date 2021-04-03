import {Link, withRouter} from 'react-router-dom'; 


// HOME =================================================== 
export default function HomePage() { 
  return <div> 
    <h1>Demo</h1> 
    <p>This is a fullstack projects using <em>React</em>, <em>Mongoose/MongoDb</em> and <em>Expess</em>. Both front and back-ends are written in <em>Typescript</em>. The project is deployed on <em>Heroku</em>, and its database hosted on <em>MongoDb Atlas</em>.</p> 
    
    <h2><Link to='/admin'>Admin Section</Link></h2> 
    <p>The admin section allows you to edit the forms content, patients profile etc.</p> 

    <h2><Link to={'/patient'}>Patient Section</Link></h2> 
    <p>The patient section allows you to create a patient profile and complete a questionnaire and submit your answers.</p> 
  </div> 
} 
