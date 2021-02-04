import React, {useContext, useEffect} from 'react'; 
import { CrudContext } from '../../../reusable/_crud';
import {FeedBack} from '../../../components/feedback/feedback.component'; 
import {PatientProfileContext} from '../../patient/patient.page'; 
import {AnswersContext} from '../questionnaire.page'; 



// LOAD PATIENTS ================================
export function LoadQuestionnaire() { 
  const {Collections, GetICollections} = useContext(CrudContext); 
  const {patientProfile} = useContext(PatientProfileContext); 
  const {setAnswers} = useContext(AnswersContext); 

  async function GetQuestionnaire() { 
    BuildBlankForm(); 
  }

  function BuildBlankForm() { 
    const [questions] = GetICollections(['question'])
    if(!questions) 
      return [] as IAnswer[]; 
    const _answers = questions.entries.map(q=> { 
      return {_id:'', answer:-1, pid:patientProfile._id, qid:q._id} as IAnswer; 
    }); 
    setAnswers(_answers); 
  }

  useEffect(() => { 
    GetQuestionnaire(); 
  }, []); 

  return <div> 
    <FeedBack/> 
  </div> 
}