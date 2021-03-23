interface IPatient extends IEntry { 
  ramq: string; 
  firstName: string; 
  lastName: string; 
}

interface IAnswer extends IEntry { 
  patient: string; 
  date: Date;
  question: string; 
  answer: number; 
} 

interface IForm extends IEntry { 
  fId: string; 
  titles: string[]; 
} 

interface IInstruction extends IEntry { 
  iId: string; 
  labels: string[]; 
} 

interface IResponse extends IEntry { 
  rId: string; 
  responseType: any; 
} 

interface IQuestion extends IEntry{ 
  form: string; 
  instructions: string[]; 
  labels: string[]; 
  optional: boolean; 
  order: number; 
  qId: string; 
  responseType: string; 
  section: string; 
}
