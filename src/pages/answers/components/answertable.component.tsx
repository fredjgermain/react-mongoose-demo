import React, { useContext } from 'react'; 
import { PageOfPages, PagerBtn } from '../../../libs/pager/_pager'; 

import { Rows, Cols, Cell, THeads, THeadCell } 
  from '../../../libs/table/_table'; 

import { DaoContext } from '../../../libs/_dao'; 
import { AnswersContext } from '../hooks/answers.hook'; 


export function AnswerTable() { 
  const dao = useContext(DaoContext); 
  const { paging, cols, rows, GetCellArgs, GetHeadArgs } = useContext(AnswersContext); 

  return <div>
    <PageOfPages {...{paging}} /> 
    <PagerBtn {...{paging}} /> 
    <table> 
      <thead> 
        <tr><THeads {...{cols}} > 
          <THeadCell {...{GetHeadArgs}}/> 
          <br/> 
        </THeads><th>Btn</th></tr> 
      </thead> 

      <tbody> 
      <Rows {...{rows}}> 
        <Cols {...{cols}} > 
          <Cell {...{GetCellArgs}} /> 
        </Cols> 
      </Rows> 
      </tbody> 
    </table>
    <PageOfPages {...{paging}} /> 
    <PagerBtn {...{paging}} /> 
  </div>
}