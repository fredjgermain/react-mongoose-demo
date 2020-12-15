import Dao from '../mongoosedao/dao'; 


const ifieldsCollection1: IField[] = [
  {
    accessor:'_id', 
    label:'ID', 
    defaultValue: '', 
    type:'string', 
    format:'', 
    subtype:'', 
    modeltype:'', 
    options:{}, 
  },
  {
    accessor:'v1', 
    label:'Var1', 
    defaultValue: 0, 
    type:'number', 
    format:'', 
    subtype:'', 
    modeltype:'', 
    options:{}, 
  },
  {
    accessor:'vbool', 
    label:'Var bool', 
    defaultValue: false, 
    type:'boolean', 
    format:'', 
    subtype:'', 
    modeltype:'', 
    options:{}, 
  },
  {
    accessor:'v2', 
    label:'Var2', 
    defaultValue: 0, 
    type:'number', 
    format:'', 
    subtype:'', 
    modeltype:'', 
    options:{}, 
  },
  {
    accessor:'enum', 
    label:'Enum', 
    defaultValue: '', 
    type:'string', 
    format:'', 
    subtype:'', 
    modeltype:'', 
    options:{ 
      enum: ['t1','t2','t3','t4'] 
    }, 
  }, 
  {
    accessor:'arrayenum', 
    label:'Array enum', 
    defaultValue: '', 
    type:'Array', 
    format:'', 
    subtype:'string', 
    modeltype:'', 
    options:{ 
      enum: ['t1','t2','t3','t4'] 
    }, 
  }, 
  { 
    accessor:'arraynum', 
    label:'Array num', 
    defaultValue: 0, 
    type:'Array', 
    format:'', 
    subtype:'number', 
    modeltype:'', 
    options:{}, 
  }, 
  { 
    accessor:'foreign', 
    label:'Foreign', 
    defaultValue: '', 
    type:'ObjectID', 
    format:'', 
    subtype:'', 
    modeltype:'collection2', 
    options:{}, 
  },
  { 
    accessor:'foreign many', 
    label:'Foreign many', 
    defaultValue: '', 
    type:'Array', 
    format:'', 
    subtype:'ObjectID', 
    modeltype:'collection2', 
    options:{}, 
  }
]


const ifieldsCollection2: IField[] = [
  {
    accessor:'_id', 
    label:'ID', 
    defaultValue: '', 
    type:'string', 
    format:'', 
    subtype:'', 
    modeltype:'', 
    options:{}, 
  },
  {
    accessor:'name', 
    label:'Name', 
    defaultValue: 'aaa', 
    type:'string', 
    format:'', 
    subtype:'', 
    modeltype:'', 
    options:{ 
      abbreviate:true, 
    }, 
  }
]



// Mock collection 1
const icollection1:ICollection = {
  accessor:'collection1', 
  label: 'Collection 1', 
  ifields:ifieldsCollection1, 
  entries: [ 
    {_id:'1', v1:1, v2:2}, 
    {_id:'2', v1:5, v2:9}, 
    {_id:'3', v1:4, v2:8}, 
    {_id:'4', v1:6, v2:10}, 
    {_id:'5', v1:3, v2:12}, 
    {_id:'6', v1:6, v2:10}, 
    {_id:'7', v1:4, v2:12}, 
    {_id:'8', v1:6, v2:6}, 
    {_id:'9', v1:3, v2:8}, 
    {_id:'10', v1:6, v2:1}, 
    {_id:'11', v1:3, v2:4}, 
  ] 
}

const icollection2:ICollection = { 
  accessor:'collection2',  
  label: 'Collection 2', 
  ifields:ifieldsCollection2, 
  entries: [ 
    {_id:'1', name:'Jimmy'}, 
    {_id:'2', name:'Goergy'}, 
    {_id:'3', name:'Sammy'}, 
    {_id:'4', name:'Timmy'}, 
    {_id:'5', name:'Jonny'}, 
    {_id:'6', name:'Nathan'}, 
  ] 
}

const dao = new Dao(); 
dao.iCollections = [icollection1, icollection2]; 


export {dao};