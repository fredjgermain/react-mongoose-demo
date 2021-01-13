import React, { useEffect, useState, useContext } from 'react';
import {DataAccessObject, ICrud, IUseDao, useDao} from '../../../reusable/dao/_dao'; 
import {CrudMongoose} from '../../../reusable/mongooseparser/mongooseaxios'; 
import {Select, Options} from '../../../reusable/components/input/_input'; 
import {IsEmpty, IsNull} from '../../../reusable/utils/_utils'; 
import { Arrx, Elements, ElementIndex, ElementValue } from '../../../reusable/components/arrx/_arrx';

const crud = new CrudMongoose(`https://fjg-mongoose-heroku.herokuapp.com/api/`); 


export const DaoContext = React.createContext({} as IUseDao); 
// Test Dao =====================================
export function TestDao() { 
  const context = useDao(new DataAccessObject(crud as ICrud)); 
  const {state, activeCollection, Collections} = context; 

  useEffect(() => { 
    Collections(['questions', 'responses']); 
  }, []); 
  
  return <div> 
    <h1>Test DAO</h1> 
    <DaoContext.Provider value={context} > 
      {!state.ready && 'Loading'} 
      {state.ready && <SelectCollection />} 
      {!IsEmpty(activeCollection) && <DisplayDatas/>} 
    </DaoContext.Provider> 
  </div> 
} 


function SelectCollection () { 
  const {activeCollection:value, setActiveCollection:setValue, collections} = useContext(DaoContext); 
  const options:IOption[] = collections().map( ic => { return {value:ic, label:ic.label} }); 
  
  return <Select {...{value, setValue}} > 
    <Options {...{options}} /> 
  </Select>
}

function DisplayDatas () { 
  const {activeCollection} = useContext(DaoContext); 
  
  return <Arrx {...{values:activeCollection.entries}}>
    <Elements >
      <ElementIndex />
      <ElementValue />
      <br/>  
    </Elements>
  </Arrx>
}

