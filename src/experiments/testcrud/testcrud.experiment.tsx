import React, {useContext, useEffect} from 'react'; 
import {CrudContexter, CrudContext} from '../../reusable/_crud'; 
import {FeedBack} from '../../components/feedback/feedback.component';

const baseUrl = `https://fjg-mongoose-heroku.herokuapp.com/api/`; 
export function TestCrud() { 
  return <CrudContexter {...{baseUrl}}> 
    <LoadCollections/> 
  </CrudContexter> 
}


function LoadCollections() { 
  const {state, Collections, GetICollections} = useContext(CrudContext); 

  useEffect(() => { 
    Collections(['questions','responses', 'forms', 'instructions', 'patients', 'answers']); 
  }, []); 

  const ready = state.busy && state.success; 
  const [forms] = GetICollections(['forms']); 

  return <div> 
    <h1>Test Crud</h1> 
    <FeedBack/> 
    <div>{forms && forms.entries.length}</div> 
    {ready && <TestDisplay/>}
    {ready && <TestCreate/>} 
    {ready && <TestUpdate/>} 
    {ready && <TestDelete/>} 
  </div> 
}

function TestDisplay() {
  const {GetICollections} = useContext(CrudContext); 
  const [forms] = GetICollections(['forms']); 
  const {entries} = forms; 


  return <div>
    {entries.map( (e,i) => { 
      const {__v, ...content} = e; 
      return <div key={e._id+i}>{JSON.stringify(content)}</div> 
    })} 
  </div>
}

function TestCreate() {
  const {Create} = useContext(CrudContext); 

  const dummyForm:IEntry = { 
    _id: '', 
    fId: 'dummy', 
    titles: ['form dummy'], 
  }

  return <div>
    <button onClick={() => Create('forms', [dummyForm])}>
      Create
    </button>
  </div>
}

function TestUpdate() { 
  const {Update, GetICollections} = useContext(CrudContext); 

  const [forms] = GetICollections(['forms']); 

  const [dummyForm] = forms?.entries; 
  dummyForm['fId'] = 'modif'; 

  return <div>
    <button onClick={() => Update('forms', [dummyForm])}>
      Update
    </button>
  </div>
}

function TestDelete() { 
  const {Delete, GetICollections} = useContext(CrudContext); 

  const [forms] = GetICollections(['forms']); 

  const [dummyForm] = forms?.entries; 

  return <div>
    <button onClick={() => Delete('forms', [dummyForm])}>
      Delete
    </button>
  </div>
}