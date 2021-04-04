import React, {useContext, useState} from 'react'; 
import { DaoContext, IDao } from '../../../reusable/_dao'; 

//import { IUseAnswers } from ''; 


export interface IUseAnswers { 
  
} 

export function useAnswers():IUseAnswers { 
  const dao = useContext(DaoContext); 
  const [patient, setPatient] = useState(); 
  const [date, setDate] = useState(); 


  return {} as IUseAnswers; 
} 