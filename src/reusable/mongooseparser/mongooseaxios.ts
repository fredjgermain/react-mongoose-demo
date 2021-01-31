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

  public async Collection(modelName:string):Promise<ICrudResponse> { 
    const {data} = await axios.get(this.baseUrl+'collection/'+modelName); 
    const response = data as ICrudResponse; 
    response.data = ParseCollection(response.data); 
    return response; 
  } 

  /*public async Models(modelName:string) { 
    return await axios.get(this.baseUrl+'models/'+modelName); 
  } */

  public async Validate(modelName:string, toValidate:IEntry|IEntry[]) { 
    return await axios.put(this.baseUrl+'validate/'+modelName, toValidate); 
  } 

  public async Create(modelName:string, toCreate:IEntry):Promise<ICrudResponse> { 
    const {_id, _v, ...data} = toCreate;
    return await axios.put(this.baseUrl+'create/'+modelName, data) as ICrudResponse; 
  } 

  public async Read(modelName:string, ids?:string[]):Promise<ICrudResponse> { 
    return await axios.put(this.baseUrl+'read/'+modelName, ids? [ids].flat(): []) as ICrudResponse; 
  } 

  public async Ids(modelName:string):Promise<ICrudResponse> { 
    return await axios.get(this.baseUrl+'ids/'+modelName) as ICrudResponse; 
  } 

  public async Update(modelName:string, toUpdate:IEntry|IEntry[]):Promise<ICrudResponse> { 
    return await axios.put(this.baseUrl+'update/'+modelName, toUpdate) as ICrudResponse; 
  } 

  public async Delete(modelName:string, toDelete?:IEntry|IEntry[]):Promise<ICrudResponse> { 
    const ids = toDelete ? ([toDelete].flat()).map( e => e._id): []; 
    return await axios.put(this.baseUrl+'delete/'+modelName, ids? [ids].flat(): []) as ICrudResponse; 
  } 

}

