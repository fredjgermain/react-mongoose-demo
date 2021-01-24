import React, {useContext} from 'react'; 
import {DaoContext} from '../../reusable/_dao'; 

import {Rows, Row, RowContext, Cells, Cell, CellContext} from '../../reusable/_tablr'; 

import {CreateBtn, DeleteBtn, UpdateBtn} from './crudbtn.component'; 
import {IRenderers} from '../../reusable/_rendering'; 

import {CellRenderer} from './cellrenderer.component';



export function InlineUpdateDelete({page, cols, colBtn, renderers}:{page:number[], cols:IField[], colBtn:IField, renderers:IRenderers}) { 
  return <Rows {...{rows:page}}> 
    <Cells {...{ifields:cols}}> 
      <CellRenderer {...{renderers}} /> 
    </Cells> 
    <Cell {...{ifield:colBtn}}> 
      <UpdateBtn/><DeleteBtn/> 
    </Cell> 
  </Rows> 
} 

export function InlineCreate({cols, colBtn, renderers}:{cols:IField[], colBtn:IField, renderers:IRenderers}) { 
  const {activeMode} = useContext(DaoContext); 
  const isCreate = activeMode === EActionType.CREATE; 

  return <Row {...{row:-1}}> 
    <Cells {...{ifields:cols}}> 
      <span></span>
      {isCreate && <CellRenderer {...{renderers}} /> } 
    </Cells> 
    <Cell {...{ifield:colBtn}}> 
      <CreateBtn/> 
    </Cell> 
  </Row> 
} 
