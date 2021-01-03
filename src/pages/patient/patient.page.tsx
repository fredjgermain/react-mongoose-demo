import React, {useState} from 'react'; 
import {Input, Select, Options} from '../../components/input/input.component'; 
import {IOption} from '../../reusable/_input';

import '../../components/input/select.styles.css'; 

export default function Patient() { 
  const [value, setValue] = useState([]); 
  const type = 'number'; 
  const placeholder = 'test number'; 

  //const [values, setValues] = useState([]); 
  const options1:IOption[] = [ 
    {value:0, label:'valeur 0'}, 
    {value:1, label:'valeur 1'}, 
    {value:2, label:'valeur 2'}, 
    {value:3, label:'valeur 3'}, 
    {value:4, label:'valeur 4'}, 
  ]

  const options2:IOption[] = [ 
    {value:5, label:'valeur 5'}, 
    {value:6, label:'valeur 6'}, 
    {value:7, label:'valeur 7'}, 
    {value:8, label:'valeur 8'}, 
  ]; 

  /*<div className={'select_main'}> 
      <div className={'select_header'}> 
        <div className={'select_header_removable_items'}> 
          <div className={'placeholder'}>select1</div>
          <Btn>Select 2 | X </Btn>
          <Btn>Select 2 | X </Btn>
          <Btn>Select 2 | X </Btn>
        </div> 
        <div className={'select_header_foldbtn'}> 
          <Btn>V</Btn> 
        </div> 
      </div>
      <div className={'select_body'}> 
        <div>Options</div> 
        <div>Options</div> 
      </div> 
    </div> 
  */

 //<Btn>Λ</Btn> 

  return <div> 

    <div> 
      <Select {...{type, value, setValue, multiple:true}} > 
        <Options {...{options:options1}} /> 
        <Options {...{options:options2}} /> 
      </Select> 
    </div> 
    <h1>PATIENT SECTION</h1> 
    
  </div> 
} 

function Btn({children}:React.PropsWithChildren<any>) { 
  return <div className={'btn'}>{children}</div> 
}
