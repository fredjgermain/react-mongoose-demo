import { ValidatorArrayLength, ValidatorMinMaxNumber, ValidatorRegex, ValidatorRequired } from '../utils/validators';
import {collections} from './mockdata';


const mockCollectiona:ICollection = {accessor:'collectiona', label:'Collection A', 
  ifields: [ 
    // _id
    {accessor:'_id', label:'', defaultValue:'', type:'string'}, // string ? or objectId ? 
    {accessor:'name', label:'Name', defaultValue:'', type:'string', validators:[ 
      ValidatorRequired(), 
    ]}, 
    {accessor:'age', label:'Age', defaultValue:0, type:'number', validators:[ 
      ValidatorRequired(), 
      ValidatorMinMaxNumber(0), 
    ]}, 
  ], entries:[ 
    {_id:'1', name:'jo', age:12}, 
    {_id:'2', name:'biz', age:52} 
  ]
} 

const mockCollectionb:ICollection = {accessor:'collectionb', label:'Collection B', 
  ifields: [ 
    // _id
    {accessor:'_id', label:'', defaultValue:'', type:'string'}, // string ? or objectId ? 
    {accessor:'question', label:'Question', defaultValue:'', type:'string', validators:[ 
      ValidatorRequired(), 
    ]}, 
  ], entries:[ 
    {_id:'1', question:'question 1'}, 
    {_id:'2', question:'question 2'} 
  ]
} 


export const mockDb:ICollection[] = [ 
  mockCollectiona, 
  mockCollectionb, 
  ...collections, 
] 
