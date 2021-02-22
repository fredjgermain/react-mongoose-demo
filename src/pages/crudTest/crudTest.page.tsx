import {useState, useContext, useEffect} from 'react'; 
import {IsEmpty} from '../../reusable/_utils'; 
import {useLoader} from '../../reusable/_useloader'; 
import { DaoContext } from '../../reusable/_dao2';


export function CrudTest() { 
  const {GetIEntries, Collections, Create, Read, Update, Delete} = useContext(DaoContext); 
  
  const [entries, setEntries] = useState([] as IEntry[]); 
  const [toUpdate, setToUpdate] = useState({} as IEntry); 
  const callback = (res:any) => { 
    const entries = (res as ICrudResponse[]).map(r => r.data); 
    const toUpdate = !IsEmpty(entries) ? entries[entries.length-1] : {} as IEntry; 
    setEntries(entries); 
    setToUpdate({...toUpdate, titles:['Title mod', 'Title mod'], fId:'fmod'}); 
  }; 
  const {state, Load} = useLoader(); 

  //console.log(state); 
  
  const toCreate = {titles:['Title x', 'Title x'], _id:'', fId:'fx'} as IEntry; 

  const LoadCollection = () => Load(() => Collections(['forms'])); 
  const LoadRead = () => Load(() => Read('forms'), callback); 
  const LoadCreate = () => Load(() => Create('forms', [toCreate]), callback); 
  const LoadUpdate = () => Load(() => Update('forms', [toUpdate]), callback); 
  const LoadDelete = () => Load(() => Delete('forms', [toUpdate]), callback); 


  return <div> 
    <h2>CrudTest</h2> 
    <div> 
      STATE:
      {JSON.stringify([state.success])} 
    </div> 
    <div>
      {entries.map((e, i) => { 
        const {_id, ...data} = e; 
        return <div key={_id}>{i}. {JSON.stringify(data)}</div> 
      })} 
    </div> 
    <br/>  
    <button onClick={LoadCollection}>Collections</button> <br/>
    <button onClick={LoadRead}>Read</button> <br/>
    
    <div>{JSON.stringify(toCreate)}</div>
    <button onClick={LoadCreate}>Create</button> <br/>

    <div>{JSON.stringify(toUpdate)}</div>
    <button onClick={LoadUpdate} disabled={IsEmpty(toUpdate)}>Update</button> <br/>
    <button onClick={LoadDelete} disabled={IsEmpty(toUpdate)}>Delete</button> <br/>
  </div> 
} 
