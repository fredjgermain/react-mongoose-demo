import React from 'react'; 
import { IUseAnswers, useAnswers } from './hooks/useanswers.hook'; 

/* 
select a patient. 
select a date amonst available dates. 
*/ 
export const AnswersContext = React.createContext({} as IUseAnswers); 
export default function AnswersPage() { 
  const context = useAnswers(); 

  return <AnswersContext.Provider value={context}> 

  </AnswersContext.Provider>
}