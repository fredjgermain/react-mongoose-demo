import React from 'react'; 
import { IUseAnswers, useAnswers } from './hooks/useanswers.hook'; 
import { InputFilter, useFilter, IInputFilter } from '../../libs/_inputs'; 


export const AnswersContext = React.createContext({} as IUseAnswers); 
export default function AnswersPage() { 
  const context = useAnswers(); 
  const {patients, filteredValues, SetFilters} = context; 

  return <AnswersContext.Provider value={context}> 
    {patients.map( (patient,i) => <div key={i}> 
      {JSON.stringify(patient)} 
    </div>)} 
    <InputFilter {...{ type:'string', handle:"ramq", SetFilters }} /> 
    <InputFilter {...{ type:'string', handle:"firstName", SetFilters }} /> 
    <InputFilter {...{ type:'string', handle:"lastName", SetFilters }} /> 

    {filteredValues.map( (answer,i) => <div key={i}> 
      {JSON.stringify(answer)} 
    </div>)} 
  </AnswersContext.Provider> 
}