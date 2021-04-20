import React, {useContext, useState} from 'react'; 
import { DaoContext, IDao } from '../../../libs/_dao'; 


export interface IUseAnswers { 
  
} 

export function useAnswers():IUseAnswers { 
  const dao = useContext(DaoContext); 
  const answers = dao.GetICollections(['patient']); 

  return {} as IUseAnswers; 
} 