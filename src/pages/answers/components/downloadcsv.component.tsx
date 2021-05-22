import { useContext } from 'react'; 
import { DaoContext } from '../../../libs/_dao'; 
import { AnswersContext } from '../hooks/answers.hook'; 
import { DownLoadFile } from '../../../libs/writefile/writefile'; 
import { YMD } from '../../../libs/utils/date/ymd.class'; 


export function DownLoadCsv() {
  const dao = useContext(DaoContext); 
  const { patient, date } = useContext(AnswersContext); 
  const [patientEntry] = dao.GetIEntries('patients', [patient]) as IPatient[];   

  const fileName = date ? 
    `${patientEntry.ramq}_${new YMD(date).StringYMD()}.csv`: 
    `${patientEntry.ramq}.csv`; 

  return <DownLoadFile {...{fileName, content:['test1', 'test2']}} /> 
}