import React, {useContext, useEffect} from 'react'; 
import {DaoContext} from '../../../reusable/_dao'; 
import {FeedBack} from '../../../components/feedback/feedback.component'; 
import {PatientProfileContext} from '../../patient/patient.page'; 
import {AnswersContext} from '../questionnaire.page'; 



// LOAD PATIENTS ================================
export function LoadQuestionnaire() { 
  const {Collections, GetCollections} = useContext(DaoContext); 
  const {patientProfile} = useContext(PatientProfileContext); 
  const {setAnswers} = useContext(AnswersContext); 

  async function GetQuestionnaire() { 
    await Collections(['questions', 'forms', 'responses', 'answers', 'instructions']); 
    BuildBlankForm(); 
  }

  function BuildBlankForm() { 
    const questions = GetCollections().find( c => c.accessor==='questions'); 
    if(!questions) 
      return [] as IAnswer[]; 
    const _answers = questions.entries.map(q=> { 
      return {_id:'', answer:-1, pid:patientProfile._id, qid:q._id} as IAnswer; 
    }); 
    console.log(_answers); 
    setAnswers(_answers); 
  }

  useEffect(() => { 
    GetQuestionnaire(); 
  }, []); 

  return <div> 
    <FeedBack/> 
  </div> 
}