import React, {useState} from 'react'; 
import {Select, Options} from '../../reusable/input/_input'; 


// SELECT ==================================
export function TestSelects() { 
  const options1:IOption[] = [ 
    {value:0, label:'valeur 0'}, 
    {value:1, label:'valeur 1'}, 
    {value:2, label:'valeur 2'}, 
    {value:3, label:'valeur 3'}, 
    {value:4, label:'valeur 4'}, 
  ]
  const option1render = <Options {...{label:'group 1', options:options1}} />  

  const options2:IOption[] = [ 
    {value:5, label:'valeur 5'}, 
    {value:6, label:'valeur 6'}, 
    {value:7, label:'valeur 7'}, 
    {value:8, label:'valeur 8'}, 
  ]; 
  const option2render = <Options {...{label:'group 2', options:options2}} /> 

  const options3:IOption[] = [ 
    {value:'0', label:'valeur 0'}, 
    {value:'1', label:'valeur 1'}, 
    {value:'2', label:'valeur 2'}, 
    {value:'3', label:'valeur 3'}, 
    {value:'4', label:'valeur 4'}, 
  ]
  const option3render = <Options {...{label:'group 3', options:options3}} /> 
  
  const optionsBool:IOption[] = [ 
    {value:true, label:'Vrai'}, 
    {value:false, label:'Faux'}, 
  ] 
  const optionBool = <Options {...{label:'Vrai Faux', options:optionsBool}} /> 
  // ------------------------------------------------

  return <div> 
    <h1>Test Select</h1> 
    <TestSelect type={'string'} value={[0]} defaultValue={''} > 
      {option1render} 
      {option2render} 
    </TestSelect> 
    <TestSelect type={'number'} value={['0']} defaultValue={0} > 
      {option3render} 
    </TestSelect> 
    <TestSelect type={'boolean'} value={false} defaultValue={false} > 
      {optionBool} 
    </TestSelect> 
  </div>
} 


interface ITest{ 
  value:any, 
  type:string, 
  defaultValue:any; 
}


// TEST SELECT ==================================
function TestSelect({children,...props}:React.PropsWithChildren<ITest>) { 
  const [value, setValue] = useState(props.value); 
  const {type, defaultValue} = props; 
  const placeholder = 'placeholder'; 

  return <div> 
    {JSON.stringify(value)} 
    <Select {...{value, setValue, multiple:true, width:10, placeholder}} > 
      {children} 
    </Select> 
  </div> 
}