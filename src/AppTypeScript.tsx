import Nav from './components/nav/nav.component'; 
import { Switch, Route } from 'react-router-dom'; 
import { DaoContexter } from './reusable/_dao'; 
import { usePreloadCollections } from './components/preloader.component'; 

// Pages
import Landing from './pages/landing/landing.page'; 
import Home from './pages/home/home.page'; 
import AdminPage from './pages/admin/admin.page'; 
import PatientPage from './pages/patient/patient.page'; 
import { Feedback } from './components/feedback/feedback.component'; 

const baseUrl = `https://fjg-mongoose-heroku.herokuapp.com/api/`; 


// APP ====================================================
export default function AppTypeScript() { 
  return <DaoContexter {...{baseUrl}}> 
    <MainSection/> 
  </DaoContexter> 
} 


// MAIN SECTION ===========================================
function MainSection() { 
  const ready = usePreloadCollections(); 

  if(!ready) 
    return <Landing/> 

  return <div> 
    <Nav/> 
    <h1> h1 title ... </h1> 
    <Feedback/> 
    <Switch> 
      <Route exact path={'/'} component={Home} /> 
      <Route path={'/admin'} component={AdminPage} /> 
      <Route path={'/patient'} component={PatientPage} /> 
    </Switch> 
    <br/> 
    <div>Footer</div> 
    <br/> 
  </div> 
} 
