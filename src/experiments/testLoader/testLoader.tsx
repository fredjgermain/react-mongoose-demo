import {useEffect} from 'react'; 
import {useLoader} from '../../reusable/customhooks/useloader.hook';
import {ICrud, DAO} from '../../reusable/_dao'; 
import {Fetcher} from '../../reusable/_mongooseparser'; 

const baseUrl = `https://fjg-mongoose-heroku.herokuapp.com/api/`; 

const dao = new DAO(new Fetcher(baseUrl) as ICrud); 


export function TestLoader() { 
  const {state, Load} = useLoader(); 
  

  async function LoadFunc() { 
    await dao.Collections(['patients']) as ICrudResponse[]; 
  } 

  useEffect(() => { 
    Load(() => LoadFunc()); 
  }, []); 

  return <div>
    TestLoader
      <div>State-busy {JSON.stringify(state.busy)}</div> 
      <div>State-success {JSON.stringify(state.success)}</div> 
    </div>
}