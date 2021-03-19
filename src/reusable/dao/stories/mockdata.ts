import { ValidatorArrayLength, ValidatorMinMaxNumber, ValidatorRegex, ValidatorRequired } from '../validators';

// QUESTIONS 
const questions:ICollection = {accessor:'questions', label:'Questions', 
ifields: [ 
  // _id
  {accessor:'_id', label:'', defaultValue:'', type:'string'}, // string ? or objectId ? 
  // form
  {accessor:'form', label:'Form', defaultValue:'', type:'string', 
  validators:[ValidatorRequired()]}, 
  // instructions
  {accessor:'instructions', label:'Instructions', defaultValue:'', type:'string', isArray:true}, 
  // labels
  {accessor:'labels', label:'Labels', defaultValue:'', type:'string', isArray:true, 
  validators:[ValidatorRequired()]}, 
  // optional
  {accessor:'optional', label:'Optional', defaultValue:false, type:'boolean'}, 
  //order 
  {accessor:'order', label:'Order', defaultValue:0, type:'number'}, 
  // qId
  {accessor:'qId', label:'Qid', defaultValue:'', type:'string', validators:[ValidatorRequired()]}, 
  // responseType
  {accessor:'responseType', label:'Response type', defaultValue:'', type:'string', validators:[ValidatorRequired()]}, 
  // section
  {accessor:'section', label:'Section', defaultValue:'', type:'string'}, 

], entries:[ 
  {_id:'1', form:'1', instructions:[1], labels:['question 1'], qId:'q1', responseType:'1'}, 
  {_id:'2', form:'1', instructions:[1], labels:['question 2'], qId:'q2', responseType:'1'}, 
  {_id:'3', form:'1', instructions:[1], labels:['question 3'], qId:'q3', responseType:'1'}, 
  {_id:'4', form:'1', instructions:[1], labels:['question 4'], qId:'q4', responseType:'1'}, 
  {_id:'5', form:'1', instructions:[1], labels:['question 5'], qId:'q5', responseType:'1'}, 

  {_id:'6', form:'2', instructions:[2], labels:['question 6'], qId:'q6', responseType:'2'}, 
  {_id:'7', form:'2', instructions:[2], labels:['question 7'], qId:'q7', responseType:'2'}, 
  {_id:'8', form:'2', instructions:[2], labels:['question 8'], qId:'q8', responseType:'2'}, 
  {_id:'9', form:'2', instructions:[2], labels:['question 9'], qId:'q9', responseType:'2'}, 
  {_id:'10', form:'2', instructions:[1], labels:['question 10'], qId:'q10', responseType:'3'}, 
]
} 


// RESPONSES 
const responses:ICollection = {accessor:'responses', label:'Responses', 
ifields: [ 
  // _id
  {accessor:'_id', label:'', defaultValue:'', type:'string'}, // string ? or objectId ? 
  // rId
  {accessor:'rId', label:'Rid', defaultValue:'', type:'string', validators:[ValidatorRequired()]}, 
  // responseType
  {accessor:'responseType', label:'Response type', defaultValue:{}, type:'mixed', isMixed:true, validators:[ValidatorRequired()]}, 

], entries:[ 
  { 
    _id:'1', rId: 'weekdays', 
    responseType: { 
      type: 'String', 
      enum: ['monday', 'thuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'], 
    }, 
  }, 
  { 
    _id:'2', rId: 'disagreeagree', 
    responseType: { 
      type: 'String', 
      enum: ['strongly disagree', 'disagree', 'neutral', 'agree', 'strongly agree'], 
    }, 
  }, 
  { 
    _id:'3', rId: '0-7', 
    responseType: { 
      type: 'String', 
      enum: [0, 1, 2, 3, 4, 5, 6, 7], 
    }, 
  } 
] 
} 

// FORMS
const forms:ICollection = {accessor:'forms', label:'Forms', 
ifields: [ 
  // _id
  {accessor:'_id', label:'', defaultValue:'', type:'string'}, // string ? or objectId ? 
  // fId
  {accessor:'fId', label:'Fid', defaultValue:'', type:'string', validators:[ValidatorRequired()]}, 
  // titles
  {accessor:'titles', label:'Titles', defaultValue:'', type:'string', isArray:true, 
  validators:[ValidatorRequired()]}, 

], entries:[ 
  { 
    _id: '1', fId: 'f1', 
    titles: ['Title form 1', 'titre form 1'], 
  }, 
  { 
    _id: '2', fId: 'f2', 
    titles: ['Title form 2', 'titre form 2'], 
  },
  { 
    _id: '3', fId: 'f3', 
    titles: ['Title form 3', 'titre form 3'], 
  } 
] 
} 

// INSTRUCTIONS
const instructions:ICollection = {accessor:'instructions', label:'Instructions', 
ifields: [ 
  // _id
  {accessor:'_id', label:'', defaultValue:'', type:'string'}, // string ? or objectId ? 
  // iId
  {accessor:'iId', label:'Iid', defaultValue:'', type:'string', validators:[ValidatorRequired()]}, 
  // labels
  {accessor:'labels', label:'Labels', defaultValue:'', type:'string', isArray:true, 
  validators:[ValidatorRequired()]}, 

], entries:[ 
  { 
    _id: '1', iId: 'i1', 
    label: ['Instruction 1', 'Instruction 1'], 
  }, 
  { 
    _id: '2', iId: 'i2', 
    labels: ['Instruction 2', 'Instruction 2'], 
  } 
] 
} 



// ANSWERS 
const answers:ICollection = {accessor:'answers', label:'Answers', 
ifields: [ 
  // _id
  {accessor:'_id', label:'', defaultValue:'', type:'string'}, // string ? or objectId ? 
  // patient
  {accessor:'patient', label:'Patient', defaultValue:'', type:'string', validators:[ValidatorRequired()]}, 
  // patient
  {accessor:'date', label:'Date', defaultValue:Date.now(), type:'date', validators:[ValidatorRequired()]}, 
  // question
  {accessor:'question', label:'Question', defaultValue:'', type:'string', validators:[ValidatorRequired()]}, 
  // answer
  {accessor:'answer', label:'Answer', defaultValue:-1, type:'number', validators:[ValidatorRequired()]}, 
], entries:[] 
} 

const patients:ICollection = {accessor:'patients', label:'Patients', 
ifields: [ 
  // _id
  {accessor:'_id', label:'', defaultValue:'', type:'string'}, // string ? or objectId ? 
  // ramq
  {accessor:'ramq', label:'Ramq', defaultValue:'', type:'string', validators:[ValidatorRegex('^[a-zA-Z]{4}[0-9]{8}$')]}, 
  // firstname
  {accessor:'firstName', label:'First name', defaultValue:'', type:'string', validators:[ValidatorRequired()]}, 
  // patient
  {accessor:'lastName', label:'Last Name', defaultValue:'', type:'string', validators:[ValidatorRequired()]}, 
  
], entries:[] 
} 

export const collections = [questions, responses, forms, instructions, patients, answers]; 