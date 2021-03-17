import React from 'react'; 
import Editor from './editor.component'; 

export default { 
  title: 'editor/Editor', 
  component: Editor 
} 

const Template = args => <Editor {...args} /> 


// Editor One Value ===========================================
export const EditorNumber = Template.bind({}) 
EditorNumber.args = { 
  value:12, 
  ifield:{accessor:'', label:'', type:'number', defaultValue:12}, 
  editValue: (newValue:any) => console.log(newValue) 
} 

export const EditorString = Template.bind({})
EditorString.args = { 
  value:'this is a string test', 
  ifield:{accessor:'', label:'', type:'string', defaultValue:''}, 
  editValue: (newValue:any) => console.log(newValue)  
}

export const EditorBool = Template.bind({}) 
EditorBool.args = { 
  value:false, 
  ifield:{accessor:'', label:'', type:'boolean', defaultValue:false}, 
  editValue: (newValue:any) => console.log(newValue) 
}

// Editor Many value =============================================
export const EditorManyNumber = Template.bind({})
EditorManyNumber.args = { 
  value:[1,23,6,5,8], 
  ifield:{accessor:'', label:'', type:'number', defaultValue:0, isArray:true}, 
  editValue: (newValue:any) => console.log(newValue) 
}

export const EditorManyString = Template.bind({})
EditorManyString.args = { 
  value:['there', 'is', 'many', 'strings'], 
  ifield:{accessor:'', label:'', type:'string', defaultValue:'', isArray:true}, 
  editValue: (newValue:any) => console.log(newValue)  
}

export const EditorManyBool = Template.bind({})
EditorManyBool.args = {
  value:[false, true, false],
  ifield:{accessor:'', label:'', type:'boolean', defaultValue:false, isArray:true}, 
  editValue: (newValue:any) => console.log(newValue)  
}


// Editor Select Single ===================================
export const EditorSelectSingle_String = Template.bind({}) 
EditorSelectSingle_String.args = { 
  value:'', 
  ifield:{accessor:'', label:'', type:'string', defaultValue:'', isArray:true}, 
  options: [ 
    {value:'a', label:'option a'}, 
    {value:'b', label:'option b'}, 
    {value:'c', label:'option c'}, 
  ] as IOption[],
}