import React, {useContext, useState} from 'react'; 
import { DaoContext, IDao } from '../../../libs/_dao'; 
import { InputFilter, useFilter, IInputFilter } from '../../../libs/_inputs'; 

export interface IUseAnswers { 
  patients: IPatient[]; 
  filteredValues: IPatient[]; 
  SetFilters: (newValue: any, keys?: TKey[] | undefined) => void; 
} 


/** 
 * Get answers ... 
 * add filters . 
*/
export function useAnswers():IUseAnswers { 
  const dao = useContext(DaoContext); 
  const patients = dao.GetIEntries('patients') as IPatient[]; 
  const {filteredValues, SetFilters} = useFilter(patients); 
  return {patients, filteredValues, SetFilters} as IUseAnswers; 
} 