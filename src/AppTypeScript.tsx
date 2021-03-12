import Nav from './components/nav/nav.component'; 
import { Switch, Route } from 'react-router-dom'; 
import { DaoContexter } from './reusable/_dao'; 
import { usePreloadCollections } from './components/preloader.component'; 

// Pages
import Landing from './pages/landing/landing.page'; 
import Home from './pages/home/home.page'; 
import AdminPage from './pages/admin/admin.page'; 
import PatientPage from './pages/patient/patient.page'; 
import { FeedbackObj } from './components/feedback/feedback.component';
import { useEffect, useRef } from 'react';

const baseUrl = `https://fjg-mongoose-heroku.herokuapp.com/api/`; 


// APP ====================================================
export default function AppTypeScript() { 
  return <DaoContexter {...{baseUrl}}> 
    <MainSection/> 
  </DaoContexter> 
} 


type FeedbackLine = {type:number, msg:string} 
type FeedbackHook = { 
  getFeedbacks: () => FeedbackLine[], 
  setFeedbacks: React.Dispatch<React.SetStateAction<FeedbackLine[]>> 
} 
// MAIN SECTION ===========================================
function MainSection() { 
  const ready = usePreloadCollections(); 
  const ref = useRef<any>(null); 

  useEffect(() => { 
    console.log(ref); 
  },[]); 

  if(!ready) 
    return <Landing/> 

  return <div> 
    <Nav/> 
    <FeedbackObj _ref={ref} /> 
    <button onClick={() => ref?.current.setFeedbacks([{type:0, msg:'success !!'}] )} >Success</button> <br/> 
    <button onClick={() => ref?.current.setFeedbacks([{type:1, msg:'note?'}] )} >Node</button> <br/> 
    <button onClick={() => ref?.current.setFeedbacks([{type:2, msg:'warning !!'}] )} >Warning</button> <br/> 
    <button onClick={() => ref?.current.setFeedbacks([{type:3, msg:'failure !!'}] )} >Failure</button> <br/> 

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

