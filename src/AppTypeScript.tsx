import Nav from './components/nav/nav.component'; 
import { Switch, Route } from 'react-router-dom'; 
import { DaoContexter } from './reusable/_dao'; 
//import { usePreloadCollections } from './components/preloader.component'; 

/*import Editor from './components/'; 
import Reader from './components/'; */


// Pages
import Landing from './pages/landing/landing.page'; 
import Home from './pages/home/home.page'; 
import AdminPage from './pages/admin/admin.page'; 
import PatientPage from './pages/patient/patient.page'; 
import QuestionnairePage from './pages/questionnaire/questionnaire.page'; 

const baseUrl = `https://fjg-mongoose-heroku.herokuapp.com/api/`; 


// APP ====================================================
export default function AppTypeScript() { 
  return <DaoContexter {...{baseUrl}}> 
    <MainSection/> 
  </DaoContexter> 
} 

// MAIN SECTION ===========================================
function MainSection() { 
  //const ready = usePreloadCollections(); 

  if(!ready) 
    return <Landing/> 

  return <div> 
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

