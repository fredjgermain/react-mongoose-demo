import React, { useContext } from 'react'; 
import { Rows, Cols, Cell, THeads, THeadCell } 
  from '../../../libs/table/_table'; 

import { DaoContext } from '../../../libs/_dao'; 
import { AnswersContext } from '../hooks/answers.hook'; 
import { RoundBox } from '../../../components/roundbox.component';
import { Pager } from '../../../components/pager.component'; 
import { EmailAnswersBtn } from './emailanswersbtn.component'; 


export function AnswerTable() { 
  const dao = useContext(DaoContext); 
  const { patient, paging, cols, rows, GetCellArgs, GetHeadArgs } = useContext(AnswersContext); 
  const [patientEntry] = dao.GetIEntries('patients', [patient]) as IPatient[]; 

  return <RoundBox> 
    <h3>Patient: {patientEntry.firstName} {patientEntry.lastName}</h3> 
    <ul> 
      <li>{patientEntry.ramq}</li> 
      <li>firstName: {patientEntry.firstName}</li> 
      <li>{patientEntry.lastName}</li> 
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
        <Cols {...{cols}} > 
          <Cell {...{GetCellArgs}} /> 
        </Cols> 
      </Rows> 
      </tbody> 
    </table>
    <Pager {...{paging}} /> 
    <EmailAnswersBtn /> 
  </RoundBox>
}