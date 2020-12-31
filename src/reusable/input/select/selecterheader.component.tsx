import {useContext} from 'react'; 
import {SelecterContext} from './selecter.component'; 
import {IOption} from '../input.utils'; 
import {ToArray} from '../../_utils'; 


// Select Header ================================
export function SelecterHeader() { 
  const {value, placeHolder, options} = useContext(SelecterContext); 
  const selection:IOption[] = []; 
  ToArray(value).forEach( v => { 
    const o = options.find( o => o.value === v); 
    if(o) 
      selection.push(o); 
  }); 
  //console.log(ToArray(value)); 
  //const selection = options.filter( o => ToArray(value).includes(o.value) ); 

  if(selection.length > 0)
    return <div className={'select_header'} > 
      <span className={'select_header_selection'}> 
        {selection.map( (option, i) => { 
          return <SelectedOption key={i} option={option} /> 
        })}</span> 
      <FoldButton /> 
    </div>; 
  return <div className={'select_header'} > 
    <span className={'select_placeholder'}>{placeHolder}</span> 
    <FoldButton /> 
  </div> 
} 


// SelectedOption -------------------------------
function SelectedOption({option}:{option:IOption}) { 
  const {Select} = useContext(SelecterContext); 
  return <button className={'select_option_btn'} onClick={ () => Select(option.value) } >
    {option.label} | X 
  </button> 
}

// Fold Button ----------------------------------
function FoldButton() { 
  const {fold, setFold} = useContext(SelecterContext); 
  const FoldUnFold = () => setFold( () => !fold); 
  
  return <span className={'select_header_btn'}>
    <button onClick={FoldUnFold}>V</button>
  </span>; 
}
