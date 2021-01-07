import {useContext, useEffect} from 'react'; 
import {useLoader} from '../../../reusable/useloader/_useloader'; 

import {CrudContext, PatientContext} from '../patient.page'; 


// PatientsCollectionLoader ===================== 
export function PatientsLoader() { 
  const {crud} = useContext(CrudContext); 
  const {setPatients} = useContext(PatientContext); 
  const {state, Load} = useLoader(); 

  const loadfunc = async () => { 
    const response:IResponse = await crud.Collection('patients'); 
    if(response.success) 
      setPatients(() => response.data as ICollection); 
  }; 

  useEffect(() => {Load(loadfunc)}, []); 


  /* ?????? TO ADD IN USELOADER ??????
  function Component(props) {
    const [fetched, setFetched] = React.useState(false);
    React.useEffect(() => {
      const ac = new AbortController();
      Promise.all([
        fetch('http://placekitten.com/1000/1000', {signal: ac.signal}),
        fetch('http://placekitten.com/2000/2000', {signal: ac.signal})
      ]).then(() => setFetched(true))
        .catch(ex => console.error(ex));
      return () => ac.abort(); // Abort both fetches on unmount
    }, []);
    return fetched;
  }
  */

  if(!state.ready) 
    return <div> Loading ... </div> 
  if(state.ready && !state.success) 
    return <div> Oh no! An error occured ... </div> 
  return null; 
} 