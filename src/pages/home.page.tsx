import React from 'react'; 
import {ICrud, DAO} from '../reusable/_dao'; 
import {CrudMongoose} from '../reusable/_mongooseparser'; 


const crud = new CrudMongoose(`https://fjg-mongoose-heroku.herokuapp.com/api/`); 


export default function Home() { 
  const dao = new DAO(crud as ICrud);

  return <div> 
    <h1>HOME PAGE</h1> 
  </div> 
} 