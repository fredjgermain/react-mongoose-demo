import { useContext } from 'react'; 
import { DaoContext } from '../../../libs/_dao'; 
import { AnswersContext } from '../hooks/answers.hook'; 
import { DownLoadFile } from '../../../libs/writefile/writefile'; 
import { YMD } from '../../../libs/utils/date/ymd.class'; 


export function DownLoadCsv() {
  const dao = useContext(DaoContext); 
  const { patient, date, paging } = useContext(AnswersContext); 
  const [patientEntry] = dao.GetIEntries('patients', [patient]) as IPatient[]; 

  const linkLabel = 'Download answers in a CSV file'
  const fileName = date ? 
    `${patientEntry.ramq}_${new YMD(date).StringYMD()}.csv`: 
    `${patientEntry.ramq}.csv`; 

  const {page} = paging; 
  const content = ToCsvFile(page, ['patient', 'question', 'date', 'answer']); 

  return <DownLoadFile {...{linkLabel, fileName, content}} /> 
} 


function ToCsvFile(datas:any[], cols:string[]) { 
  const header = ['N', ...cols].join('\t'); 
  const entries = datas.map( (data, i) => { 
    return [i, ...cols.map( col => JSON.stringify(data[col]))].join('\t') 
  }).join('\n'); 
  return [header,entries].join('\n'); 
}