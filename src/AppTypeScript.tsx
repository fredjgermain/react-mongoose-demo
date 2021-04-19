import Nav from './components/nav/nav.component'; 
import { Switch, Route } from 'react-router-dom'; 
import { DaoContexter, ICrud } from './libs/_dao'; 
//import { SessionsDebug } from './components/sessiondebug/sessiondebug.component'; 
import { Fetcher } from './libs/_mongooseparser'; 

import './css/main.css'; 

// Pages
import Landing from './pages/landing/landing.page'; 
import HomePage from './pages/home/home.page'; 
import AdminPage from './pages/admin/admin.page'; 
import PatientPage from './pages/patient/patient.page'; 
import QuestionnairePage from './pages/questionnaire/questionnaire.page'; 
import ThankYouPage from './pages/thankyou/thankyou.page'; 

import './css/main.css'; 


const baseUrl = `https://fjg-mongoose-heroku.herokuapp.com/api/`; 
const crud = new Fetcher(baseUrl); 
const accessors = ['questions', 'patients', 'responses', 'forms', 'instructions', 'answers']; 
const loadingComponent = <Landing/>; 

// APP ====================================================
export default function AppTypeScript() { 
  return <DaoContexter {...{crud:crud as ICrud, accessors, loadingComponent}}> 
    <MainSection/> 
  </DaoContexter> 
} 

// MAIN SECTION ===========================================
function MainSection() { 

  //<SessionsDebug {...{sessionNames:["profile", "questionnaire"]}}/> 
  return <div> 
    <Nav/> 
    <main> 
      <Switch> 
        <Route exact path={'/'} component={HomePage} /> 
        <Route path={'/admin'} component={AdminPage} /> 
        <Route path={'/patient'} component={PatientPage} /> 
        <Route path={'/questionnaire'} component={QuestionnairePage} /> 
        <Route path={'/thankyou'} component={ThankYouPage} /> 
      </Switch> 
    </main> 
    <footer>Footer</footer> 
  </div> 
} 