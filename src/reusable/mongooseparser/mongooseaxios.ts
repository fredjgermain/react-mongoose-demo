import axios from 'axios'; 
import {ParseCollection} from './mongooseparser.utils'; 

export class CrudMongoose { 
  public baseUrl:string = ''; 

  constructor(baseUrl:string) { 
    this.baseUrl = baseUrl; 
  } 
  
  public async Access() { 
    return await axios.get(this.baseUrl); 
  } 

  public async Collection(modelName:string):Promise<IResponse> { 
    const {data} = await axios.get(this.baseUrl+'collection/'+modelName); 
    const response = data as IResponse; 
    response.data = ParseCollection(response.data); 
    return response; 
  } 

  /*public async Models(modelName:string) { 
    return await axios.get(this.baseUrl+'models/'+modelName); 
  } */

  public async Validate(modelName:string, toValidate:IEntry|IEntry[]) { 
    return await axios.put(this.baseUrl+'validate/'+modelName, toValidate); 
  } 

  public async Create(modelName:string, toCreate:IEntry):Promise<IResponse> { 
    const {_id, _v, ...data} = toCreate;
    return await axios.put(this.baseUrl+'create/'+modelName, data) as IResponse; 
  } 

  public async Read(modelName:string, ids?:string[]):Promise<IResponse> { 
    return await axios.put(this.baseUrl+'read/'+modelName, ids? [ids].flat(): []) as IResponse; 
  } 

  public async Ids(modelName:string):Promise<IResponse> { 
    return await axios.get(this.baseUrl+'ids/'+modelName) as IResponse; 
  } 

  public async Update(modelName:string, toUpdate:IEntry|IEntry[]):Promise<IResponse> { 
    return await axios.put(this.baseUrl+'update/'+modelName, toUpdate) as IResponse; 
  } 

  public async Delete(modelName:string, toDelete?:IEntry|IEntry[]):Promise<IResponse> { 
    const ids = toDelete ? ([toDelete].flat()).map( e => e._id): []; 
    return await axios.put(this.baseUrl+'delete/'+modelName, ids? [ids].flat(): []) as IResponse; 
  } 

}


/*
Create

[
    {
        "success": true,
        "data": {
            "titles": [
                "Title form X",
                "titre form X"
            ],
            "_id": "60010c5840a53500179d0cb3",
            "fId": "f1",
            "__v": 0
        },
        "err": [],
        "actionType": "create"
    }
]


*/