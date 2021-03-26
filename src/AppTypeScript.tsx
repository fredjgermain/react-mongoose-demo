import Nav from './components/nav/nav.component'; 
import { Switch, Route } from 'react-router-dom'; 
import { DaoContexter, ICrud } from './reusable/_dao'; 
import { SessionsDebug } from './components/sessiondebug/sessiondebug.component'; 
//import { usePreloadCollections } from './components/preloader.component'; 

/*import Editor from './components/'; 
import Reader from './components/'; */ 


// Pages
import Landing from './pages/landing/landing.page'; 
import Home from './pages/home/home.page'; 
import AdminPage from './pages/admin/admin.page'; 
import PatientPage from './pages/patient/patient.page'; 
import QuestionnairePage from './pages/questionnaire/questionnaire.page'; 
import { Fetcher } from './reusable/_mongooseparser';

const baseUrl = `https://fjg-mongoose-heroku.herokuapp.com/api/`; 
const crud = new Fetcher(baseUrl); 
const accessors = ['questions', 'patients', 'responses', 'answers', 'forms', 'instructions'];  
const loadingComponent = <Landing/>; 

// APP ====================================================
export default function AppTypeScript() { 
  return <DaoContexter {...{crud:crud as ICrud, accessors, loadingComponent}}> 
    <MainSection/> 
  </DaoContexter> 
} 

// MAIN SECTION ===========================================
function MainSection() { 
  return <div> 
    --- Session ----- <br/> 
    <SessionsDebug {...{sessionNames:["profile", "questionnaire"]}}/> 
    ----------------- <br/> 
    <Nav/> 
    <Switch> 
      <Route exact path={'/'} component={Home} /> 
      <Route path={'/admin'} component={AdminPage} /> 
      <Route path={'/patient'} component={PatientPage} /> 
      <Route path={'/questionnaire'} component={QuestionnairePage} /> 
    </Switch> 
    <br/> 
    <div>Footer</div> 
    <br/> 
  </div> 
} 

