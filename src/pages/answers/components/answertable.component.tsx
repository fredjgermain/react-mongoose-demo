import React, { useContext } from 'react'; 
import { Rows, Cols, Cell, THeads, THeadCell } 
  from '../../../libs/table/_table'; 

import { DaoContext } from '../../../libs/_dao'; 
import { AnswersContext } from '../hooks/answers.hook'; 
import { RoundBox } from '../../../components/roundbox.component'; 
import { Pager } from '../../../components/pager.component'; 
import { EmailAnswersBtn } from './emailanswersbtn.component'; 
import { DownLoadFile } from '../../../libs/writefile/writefile'; 


export function AnswerTable() { 
  const dao = useContext(DaoContext); 
  const { patient, paging, cols, rows, GetCellArgs, GetHeadArgs } = useContext(AnswersContext); 
  const [patientEntry] = dao.GetIEntries('patients', [patient]) as IPatient[]; 

  return <RoundBox> 
    <h3>Patient: {patientEntry.firstName} {patientEntry.lastName}</h3> 
    <ul> 
      <li>RAMQ: {patientEntry.ramq}</li> 
      <li>First name: {patientEntry.firstName}</li> 
      <li>Last name: {patientEntry.lastName}</li> 
    </ul> 
    <Pager {...{paging}} /> 
    <table> 
      <thead> 
        <tr><THeads {...{cols}} > 
          <THeadCell {...{GetHeadArgs}}/> 
          <br/> 
        </THeads></tr> 
      </thead> 

      <tbody> 
      <Rows {...{rows}}> 
        <Cols {...{cols}}> 
          <Cell {...{GetCellArgs}} /> 
        </Cols> 
      </Rows> 
      </tbody> 
    </table>
    <Pager {...{paging}} /> 
    <EmailAnswersBtn /> 
    <DownLoadFile {...{list:['test1', 'test2']}} /> 
  </RoundBox>
}