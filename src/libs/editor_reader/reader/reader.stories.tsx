import { Story } from '@storybook/react'; 
import {Reader, IReader} from './reader.component'; 

export default { 
  title: 'editor/Reader', 
  component: Reader 
} 

const Template:Story<IReader> = args => <Reader {...args} /> 

// Reader One Value ===========================================
export const ReaderDate = Template.bind({}) 
ReaderDate.args = { 
  value:new Date(), 
  ifield:{accessor:'', label:'', type:'date', defaultValue:new Date()}, 
} 

export const ReaderOneNumber = Template.bind({}) 
ReaderOneNumber.args = { 
  value:12, 
  ifield:{accessor:'', label:'', type:'number', defaultValue:12} 
} 

export const ReaderString = Template.bind({})
ReaderString.args = { 
  value:'this is a string test', 
  ifield:{accessor:'', label:'', type:'string', defaultValue:''} 
}

export const ReaderBool = Template.bind({})
ReaderBool.args = {
  value:false,
  ifield:{accessor:'', label:'', type:'boolean', defaultValue:false} 
}

// Reader Many value =============================================
export const ReaderManyString = Template.bind({})
ReaderManyString.args = { 
  value:['there', 'is', 'many', 'strings'], 
  ifield:{accessor:'', label:'', type:'string', defaultValue:'', isArray:true} 
}

export const ReaderManyNumber = Template.bind({})
ReaderManyNumber.args = { 
  value:[1,23,6,5,8], 
  ifield:{accessor:'', label:'', type:'number', defaultValue:0, isArray:true} 
}

export const ReaderManyBool = Template.bind({})
ReaderManyBool.args = {
  value:[false, true, false],
  ifield:{accessor:'', label:'', type:'boolean', defaultValue:false, isArray:true} 
}