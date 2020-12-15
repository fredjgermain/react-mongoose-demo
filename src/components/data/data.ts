import {IClass, IPlayer} from './datastructure'; 

const players:Array<IPlayer> = [
  {
    _id:'player1', 
    class:'class50', 
    name:'dimitri', 
    age:18, 
    sex:'male', 
  },
  {
    _id:'player2', 
    class:'class51', 
    name:'daniel', 
    age:33, 
    sex:'male', 
  },
  {
    _id:'player3', 
    class:'class52', 
    name:'susan', 
    age:22, 
    sex:'female', 
  },
  {
    _id:'player4', 
    class:'class52', 
    name:'gary', 
    age:21, 
    sex:'male', 
  },
  {
    _id:'player5', 
    class:'class53', 
    name:'lucia', 
    age:23, 
    sex:'female', 
  },
  {
    _id:'player6', 
    class:'class50', 
    name:'eli', 
    age:16, 
    sex:'female', 
  }
]

const classes:Array<IClass> = [
  {
    _id:'class50', 
    classname:'sorcerer', 
  }, 
  { 
    _id:'class51', 
    classname:'paladin', 
  }, 
  { 
    _id:'class52', 
    classname:'ranger', 
  }, 
  { 
    _id:'class53', 
    classname:'druid', 
  } 
]

export const mockDataCollections = {
  players:players, 
  classes:classes,
};