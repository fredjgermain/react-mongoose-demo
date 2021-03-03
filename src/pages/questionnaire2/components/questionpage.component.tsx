import React, { useContext } from 'react'; 
import { Arrx, Elements, Element, ElementContext } from '../../../reusable/_arrx'; 
import {Pager} from './pager.component'; 
import {QuestionnnaireContext} from '../questionnaire.page'; 
import {ItemIsComplete, ItemLabel, ItemResponse} from './questionitem.component'; 


// QUESTION PAGE ======================================================
export function QuestionPage({answers}:{answers:IAnswer[]}) { 
  const {questionnaire, GetQuestionnaireItem, paging} = useContext(QuestionnnaireContext); 
  const page = paging.pages[paging.pageIndex]; 
  const indexes = page.map(e => e.i); 
  const [first] = page.map(e => e.t); 
  const {form, instructions, question, response} = GetQuestionnaireItem(first); 
  
  return <div> 
    <h2>{form && form.titles[0]}</h2> 
    {instructions && instructions.map( p => { 
      return <h3 key={p._id} >{p.labels[0]}</h3> 
    })}
    <Arrx values={questionnaire}> 
      <Elements indexes={indexes}> 
        <ItemLabel /> <ItemResponse /> <ItemIsComplete/> 
        <br/>
      </Elements>
    </Arrx> 
    <Pager/> 
  </div> 
} 
