import axios from 'axios'; 


export class CrudAxios { 
  public baseUrl:string = ''; 

  constructor(baseUrl:string) { 
    this.baseUrl = baseUrl; 
  } 
  
  public async Access() { 
    return await axios.get(this.baseUrl); 
  } 

  public async Collection(modelName:string) {
    return await axios.get(this.baseUrl+'collection/'+modelName); 
  }

  public async Models(modelName:string) { 
    return await axios.get(this.baseUrl+'models/'+modelName); 
  } 

  public async Validate(modelName:string, toValidate:IEntry|IEntry[]) { 
    return await axios.put(this.baseUrl+'validate/'+modelName, toValidate); 
  } 

  public async Create(modelName:string, toCreate:IEntry|IEntry[]):Promise<IResponse> { 
    return await axios.put(this.baseUrl+'create/'+modelName, toCreate) as IResponse; 
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