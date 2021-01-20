import React, {useContext} from 'react'; 
import {DaoContext} from '../../reusable/_dao'; 
import {Tablr, TablrContext, 
  Header, Heads, 
  Rows, Row, RowContext, 
  Cells, Cell, CellContext} from '../../reusable/_tablr'; 
import {BuildDefaultRenderingFunc, IRenderers} from '../../reusable/_rendering'; 
import {CreateBtn, DeleteBtn, UpdateBtn} from './crudbtn.component'; 
import {IPageHook, usePage} from '../../reusable/_usepage';

import {CellRenderer} from './cellrenderer.component';


export function AdminTablr() { 
  const {activeEntry, activeCollection, GetForeignElements, GetForeignOptions, GetForeignValues} = useContext(DaoContext); 
  const {entries, ifields} = activeCollection; 
  const {pageIndex, setPageIndex, pages} = usePage(entries, 5); 
  const page = pages[pageIndex]; 

  const renderers = BuildDefaultRenderingFunc(GetForeignElements, GetForeignOptions, GetForeignValues); 

  //const cols = ifields.filter( f => f.accessor); 
  const cols = ifields.filter(f=>f.label); 
  const colBtn = {label:'Btn', accessor:'', defaultValue:'', options:{}, type:''} as IField; 

  return <div>
    {JSON.stringify(activeEntry)}
    <Tablr {...{datas:entries}}>
      <Header><Heads {...{ifields:[...cols, colBtn]}} /></Header>
      <tbody>
      <InlineUpdateDelete {...{page, cols, colBtn, renderers}}/> 
      <InlineCreate {...{cols, colBtn, renderers}}/> 
      </tbody> 
    </Tablr> 
  </div>
}


function InlineUpdateDelete({page, cols, colBtn, renderers}:{page:number[], cols:IField[], colBtn:IField, renderers:IRenderers}) { 
  return <Rows {...{rows:page}}> 
    <Cells {...{ifields:cols}}> 
      <CellRenderer {...{renderers}} /> 
    </Cells> 
    <Cell {...{ifield:colBtn}}> 
      <UpdateBtn/><DeleteBtn/> 
    </Cell> 
  </Rows> 
} 

function InlineCreate({cols, colBtn, renderers}:{cols:IField[], colBtn:IField, renderers:IRenderers}) { 
  return <Row {...{row:-1}}> 
    <Cells {...{ifields:cols}}> 
      <CellRenderer {...{renderers}} /> 
    </Cells> 
    <Cell {...{ifield:colBtn}}> 
      <CreateBtn/> 
    </Cell> 
  </Row> 
} 

function Pagin({pageIndex, setPageIndex, pages}:IPageHook) {
  return <div>
    {pages.map( (p:number[], i:number) => { 
      const onClick = () => {setPageIndex(i)} 
      const disabled = pageIndex === i; 
      return <button key={i} {...{onClick, disabled}} >{i+1}</button> 
    })} 
  </div>
}