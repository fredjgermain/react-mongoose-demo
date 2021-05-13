import { Story } from '@storybook/react'; 
import React, {useState} from 'react'; 
import { IReader } from '../reader/reader.component'; 
import { Editor } from './editor.component'; 



function TemplateEditor({...props}:IReader) { 
  const [value, setValue] = useState(props.value); 
  const editValue = (newValue:any) => setValue(newValue); 
  const args = {...props, value, editValue}

  return <div> 
    {JSON.stringify(value)} <br/>
    <Editor {...args} /> 
  </div>
}



export default { 
  title: 'editor/Editor', 
  component: TemplateEditor 
} 

const Template:Story<IReader> = args => <TemplateEditor {...args} /> 


// Editor One Value ===========================================
export const EditorDate = Template.bind({}) 
EditorDate.args = { 
  value:new Date(), 
  ifield:{accessor:'', label:'', type:'date', defaultValue:new Date()}, 
} 

export const EditorNumber = Template.bind({}) 
EditorNumber.args = { 
  value:12, 
  ifield:{accessor:'', label:'', type:'number', defaultValue:12}, 
} 

export const EditorString = Template.bind({})
EditorString.args = { 
  value:'this is a string test', 
  ifield:{accessor:'', label:'', type:'string', defaultValue:''}, 
}

export const EditorBool = Template.bind({}) 
EditorBool.args = { 
  value:false, 
  ifield:{accessor:'', label:'', type:'boolean', defaultValue:false}, 
}

// Editor Many value =============================================
export const EditorManyNumber = Template.bind({})
EditorManyNumber.args = { 
  value:[1,23,6,5,8], 
  ifield:{accessor:'', label:'', type:'number', defaultValue:0, isArray:true}, 
}

export const EditorManyString = Template.bind({})
EditorManyString.args = { 
  value:['there', 'is', 'many', 'strings'], 
  ifield:{accessor:'', label:'', type:'string', defaultValue:'', isArray:true}, 
}

export const EditorManyBool = Template.bind({})
EditorManyBool.args = {
  value:[false, true, false],
  ifield:{accessor:'', label:'', type:'boolean', defaultValue:false, isArray:true}, 
}


// Editor Select Single ===================================
export const EditorSelectSingle_String = Template.bind({}) 
EditorSelectSingle_String.args = { 
  value:'', 
  ifield:{accessor:'', label:'', type:'string', defaultValue:'', isArray:false}, 
  options: [ 
    {value:'a', label:'option a'}, 
    {value:'b', label:'option b'}, 
    {value:'c', label:'option c'}, 
  ] as IOption[],
}

// Editor Select Single ===================================
export const EditorSelectSingle_multi = Template.bind({}) 
EditorSelectSingle_multi.args = { 
  value:['1'], 
  ifield:{accessor:'', label:'', type:'string', defaultValue:'', isArray:true}, 
  options: [ 
    {value:'a', label:'option a'}, 
    {value:'b', label:'option b'}, 
    {value:'c', label:'option c'}, 
  ] as IOption[],
}