import { useContext } from 'react'; 
import { Editor } from '../../../libs/editor_reader/_editor_reader'; 
import { YMD } from '../../../libs/utils/date/ymd.class';
import { DaoContext } from '../../../libs/_dao'; 
import { AnswersContext } from '../hooks/answers.hook'; 
import { Unic } from '../../../libs/_arrayutils'; 



export function DateSelector() { 
  const dao = useContext(DaoContext); 
  const {patient, date:value, SetDate:editValue} = useContext(AnswersContext); 

  const ifield:IField = {accessor:'', label:'', defaultValue:'', type:'string'}; 
  const answers = dao.GetIEntries('answers').filter( a => (a as IAnswer).patient === patient ) as IAnswer[]; 
  
  const ymds = Unic(answers, (a, pivot) => new YMD(a.date).StringYMD() === new YMD(pivot.date).StringYMD())[0] 
    .map( a => new YMD(a.date).StringYMD()); 
  const options = ymds.map( ymd => { 
    return {value:ymd, label:ymd} as IOption; 
  }) 

  const placeholder = '-- Select a date --'; 

  return <Editor {...{value, editValue, ifield, options, placeholder}} /> 
} 
