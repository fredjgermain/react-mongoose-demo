import { Story } from '@storybook/react'; 
import { useFilter } from './inputfilter.hook'; 
import { InputFilter } from './inputfilter.component'; 


function TemplateResearch({values, filters}:{values:any[], filters:{ifield:IField, options?:IOption[]}[]}) { 
  const filter = useFilter(values); 

  return <div>
    Original values <br/>
    <div>
      {values.map( (v, i) => { 
        return <div key={i}>{JSON.stringify(v)}</div> 
      })} 
    </div>
    Filtered values
    <div>
      {filter.matchValues.map( (v, i) => { 
        return <div key={i}>{JSON.stringify(v)}</div> 
      })} 
    </div> 

    {filters.map( f => { 
      const {ifield, options} = f; 
      return <div key={ifield.accessor}> 
        <InputFilter {...{filter, ifield, options}}/> 
      </div> 
    })} 
  </div> 
} 


export default { 
  title: 'input/FilterSorter2', 
  component: TemplateResearch 
} 

const Template:Story<any> = args => <TemplateResearch {...args} /> 



export const LambdaFilter = Template.bind({}) 
LambdaFilter.args = { 
  values:[3,4,1,2,6,8,9], 
  filters:[{ifield:{accessor:'', label:'', defaultValue:0, type: 'number'} as IField}] 
} 

export const DayFilter = Template.bind({}) 
DayFilter.args = { 
  values:['2021-05-10', '2021-05-11', '2021-05-12', '2021-05-13'], 
  filters:[{ifield:{accessor:'', label:'', defaultValue:0, type: 'date'} as IField}] 
} 

export const MultipleFieldFilter = Template.bind({}) 
MultipleFieldFilter.args = { 
  values:[ 
    {a:'aa', v:1, bool:false, sex:'male'}, 
    {a:'aa', v:2, bool:true, sex:'female'}, 
    {a:'b', v:3, bool:false, sex:'male'}, 
    {a:'bb', v:4, bool:true, sex:'male'}, 
    {a:'ee', v:2, bool:false, sex:'female'}, 
    {a:'bbb', v:3, bool:false, sex:'male'}, 
  ], 
  filters:[
    {ifield: { accessor:'a', label:'A', defaultValue:'', type: 'string'} as IField}, 
    {ifield: { accessor:'v', label:'V', defaultValue:0, type: 'number'} as IField}, 
    {ifield: { accessor:'bool', label:'Bool', defaultValue:true, type: 'boolean'} as IField}, 
    {
      ifield: { accessor:'sex', label:'Sex', defaultValue:'male', type: 'string'} as IField, 
      options:[{value:'male', label:'Male'}, {value:'female', label:'Female'}] as IOption[]
    } 
  ] 
}
