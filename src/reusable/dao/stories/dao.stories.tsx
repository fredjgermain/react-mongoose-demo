import { useMemo, useEffect } from 'react'; 
import { DAO } from '../dao.class'; 
import { crud } from './mockcrud'; 
import { useLoader } from '../../_customhooks'; 



function TestValidate({dao, accessor, value}:{dao:DAO, accessor:string, value:{[key:string]:any}}) { 
  const validation = dao.Validate(accessor, value); 
  return <div> 
    {JSON.stringify(validation)} 
  </div> 
} 


function DisplayCollection({dao, accessor}:{dao:DAO, accessor:string}) { 
  const [collection] = dao.GetICollections([accessor]); 
  return <div> 
    FIELDS: <br/>
    {collection?.ifields.map( f => { 
      return <div>{JSON.stringify(f)}</div> 
    })} 
    <br/>
    ENTRIES <br/>
    {collection?.entries.map( e => { 
      return <div>{JSON.stringify(e)}</div> 
    })} 
  </div> 
} 



export default { 
  title: 'Dao/Dao', 
  component: TestMockDao, 
} 

const Template = args => <TestMockDao {...args} /> 
export const Mock_TestValidate = Template.bind({}) 
Mock_TestValidate.args = { 
  child: TestValidate, 
  args: { 
    accessor:'patients', 
    value: {ramq:'JEAF23118301'} 
  } 
} 

export const Mock_DisplayCollectionA = Template.bind({}) 
Mock_DisplayCollectionA.args = { 
  child: DisplayCollection, 
  args: { 
    accessor:'collectiona', 
  } 
} 

export const Mock_DisplayQuestions = Template.bind({}) 
Mock_DisplayQuestions.args = { 
  child: DisplayCollection, 
  args: { 
    accessor:'questions', 
  } 
} 




// -------------------------------------------------------
function useLoadCollection(Dao:DAO, accessors:string[]) { 
  const callback = (res:any) => {}; 
  const {state, Load} = useLoader(); 

  useEffect(() => { 
    Load( () => Dao.Collections(accessors), callback); 
  }, []); 

  return state.success; 
} 


function TestMockDao({...props}:{child:any, args:any}) { 
  const dao = useMemo(() => new DAO(crud), []); 
  const accessors = ['collectiona', 'collectionb', 'questions', 'patients', 'responses']; 
  const ready = useLoadCollection(dao, accessors); 

  return <div>{ 
    ready ? 
      <props.child {...{dao, ...props.args}} />: 
      'Is loading ...' 
  }</div>; 
} 