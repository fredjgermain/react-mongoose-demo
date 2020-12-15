import axios from 'axios'; 


export class Crud {
  public baseUrl:string = ''; 

  constructor(baseUrl:string) { 
    this.baseUrl = baseUrl; 
    const axiosInstance = axios.create({
      baseURL: baseUrl,
      timeout: 2000
    });
  } 

  public async Access() { 
    return await axios.get(this.baseUrl); 
  } 

  public async Models(modelName:string) { 
    return await axios.get(this.baseUrl+'models/'+modelName); 
  } 

  public async Validate(modelName:string, toValidate:IEntry|IEntry[]) { 
    return await axios.put(this.baseUrl+modelName+'/validate', toValidate); 
  } 

  public async Create(modelName:string, toCreate:IEntry|IEntry[]):Promise<IResponse> { 
    return await axios.post(this.baseUrl+modelName+'/create', toCreate) as IResponse; 
  } 

  public async Read(modelName:string, ids?:Number[]):Promise<IResponse> { 
    return await axios.put(this.baseUrl+modelName+'/read', ids? [ids].flat(): []) as IResponse; 
  } 

  public async Ids(modelName:string):Promise<IResponse> { 
    return await axios.get(this.baseUrl+modelName+'/ids') as IResponse; 
  } 

  public async Update(modelName:string, toUpdate:IEntry|IEntry[]):Promise<IResponse> { 
    return await axios.put(this.baseUrl+modelName+'/update', toUpdate) as IResponse; 
  } 

  public async Delete(modelName:string, toDelete?:IEntry|IEntry[]):Promise<IResponse> { 
    const ids = toDelete ? ([toDelete].flat()).map( e => e._id): []; 
    return await axios.put(this.baseUrl+modelName+'/delete', ids? [ids].flat(): []) as IResponse; 
  } 
} 

//const baseUrl = `http://localhost:8080/api/`; 
const baseUrl = `https://fjg-mongoose-heroku.herokuapp.com/api/`; 
const crud = new Crud(baseUrl); 

export default Crud; 
export { 
  crud, 
} 