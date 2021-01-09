import {useEffect, useContext} from 'react'; 
import {useLoader} from '../../../reusable/hooks/useloader/_useloader'; 
import {CrudContext} from '../../patient/patient.page';
import {QuestionnaireContext} from '../questionnairepage.page';



// PatientsCollectionLoader ===================== 
export function QuestionnaireLoader() { 
  const {crud} = useContext(CrudContext); 

  const {setQuestions, setResponses} = useContext(QuestionnaireContext); 
  const {state, Load} = useLoader(); 

  const loadfunc = async () => { 
    const questions:IResponse = await crud.Collection('questions'); 
    if(questions.success) 
      setQuestions(() => questions.data as ICollection); 
    console.log(questions);

    const responses:IResponse = await crud.Collection('responses'); 
    if(responses.success) 
      setResponses(() => responses.data as ICollection); 
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