import React, { useContext, useEffect } from 'react'; 
import { crud } from './mockcrud'; 
import { useLoader } from '../../_customhooks'; 
import { useDao, IUseDao, DAO, IDao, ICrud } from '../../_dao';



function TestValidate({accessor, value}:{accessor:string, value:{[key:string]:any}}) { 
  const dao = useContext(DaoContext); 
  const validation = dao.Validate(accessor, value); 
  return <div> 
    {JSON.stringify(validation)} 
  </div> 
} 


function DisplayCollection({accessor}:{accessor:string}) { 
  const dao = useContext(DaoContext); 
  const [collection] = dao.GetICollections([accessor]); 

  return <div> 
    FIELDS: <br/>
    {collection?.ifields.map( f => { 
      return <div key={f.accessor}>{JSON.stringify(f)}</div> 
    })} 
    <br/>
    ENTRIES <br/>
    {collection?.entries.map( e => { 
      return <div key={e._id}>{JSON.stringify(e)}</div> 
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
  }, 
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
function useLoadCollection(Dao:IUseDao, accessors:string[]) { 
  const callback = (res:any) => {}; 
  const {state, Load} = useLoader(); 

  useEffect(() => { 
    Load( () => Dao.Collections(accessors), callback); 
  }, []); 

  return state.success; 
} 


const DaoContext = React.createContext({} as IDao); 
function DaoContexter({crud, children}:React.PropsWithChildren<{crud:ICrud}>) { 
  const dao = useDao(new DAO(crud)); 
  const accessors = ['collectiona', 'collectionb', 'questions', 'patients', 'responses']; 
  const ready = useLoadCollection(dao, accessors); 

  return <DaoContext.Provider value={dao}> 
    {ready? children: 'not ready'} 
  </DaoContext.Provider> 
} 

function TestMockDao({...props}:{child:any, args:any}) { 
  return <DaoContexter crud={crud} > 
      <props.child {...props.args} /> 
  </DaoContexter> 
} 