import { Story } from "@storybook/react";
import { useContext } from 'react'; 
import { crud } from './mockcrud'; 
import { DaoContext, DaoContexter, ICrud} from '../../_dao'; 


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

function TestMockDao({...props}:{child:any, accessors: string[], args:any}) { 
  return <DaoContexter {...{crud:(crud as ICrud), accessors:props.accessors}} > 
    <props.child {...props.args} /> 
  </DaoContexter> 
} 


export default { 
  title: 'Dao/Dao', 
  component: TestMockDao, 
} 

const Template:Story<{child:any, accessors: string[], args:any}> = args => <TestMockDao {...args} /> 
export const Mock_TestValidate = Template.bind({}) 
Mock_TestValidate.args = { 
  child: TestValidate,
  accessors: ['questions', 'patients', 'responses', 'answers', 'forms', 'instructions'], 
  args: { 
    accessor:'patients', 
    value: {ramq:'JEAF23118301'} 
  }, 
} 

export const Mock_DisplayQuestions = Template.bind({}) 
Mock_DisplayQuestions.args = { 
  child: DisplayCollection, 
  accessors: ['questions', 'patients', 'responses', 'answers', 'forms', 'instructions'], 
  args: { 
    accessor:'answers', 
  } 
} 

