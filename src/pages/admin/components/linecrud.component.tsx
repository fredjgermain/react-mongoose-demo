import React, {useContext} from 'react'; 
import {CrudContext} from '../../../reusable/_crud'; 

import {Rows, Row, RowContext, Cells, Cell, CellContext} from '../../../reusable/_tablr'; 
import {CreateBtn, DeleteBtn, UpdateBtn} from './crudbtn.component'; 
import {CellRender} from './cellrenderer.component';
import { EActionType } from '../../../reusable/_dao';



export function InlineUpdateDelete({page, cols, colBtn}:{page:number[], cols:IField[], colBtn:IField}) { 
  return <Rows {...{rows:page}}> 
    <Cells {...{ifields:cols}}> 
      <CellRender/> 
    </Cells> 
    <Cell {...{ifield:colBtn}}> 
      <UpdateBtn/><DeleteBtn/> 
    </Cell> 
  </Rows> 
} 

export function InlineCreate({cols, colBtn}:{cols:IField[], colBtn:IField}) { 
  const {activeMode} = useContext(CrudContext); 
  const isCreate = activeMode === EActionType.CREATE; 

  return <Row {...{row:-1}}> 
    <Cells {...{ifields:cols}}> 
      <span></span>
      {isCreate && <CellRender/> } 
    </Cells> 
    <Cell {...{ifield:colBtn}}> 
      <CreateBtn/> 
    </Cell> 
  </Row> 
} 
