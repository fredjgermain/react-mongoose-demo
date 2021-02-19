import axios from 'axios'; 
import {ParseCollection} from './mongooseparser.utils'; 


// Crud Mongoose =======================================
export class Fetcher { 
  public baseUrl:string = ''; 

  constructor(baseUrl:string) { 
    this.baseUrl = baseUrl; 
  }

  // Access -----------------------------------------------
  public async Access() { 
    return await axios.get(this.baseUrl); 
  } 

  /* 
  PUT ...api/collections 
    req.body => accessors:string[] 
    res:ICrudResponse[] 
  */ 
  // Collections ..........................................
  public async Collections(accessors:string[]): Promise<ICrudResponse[]> { 
    const axiosResponses = (await axios.put(this.baseUrl+'collections/', accessors)).data as ICrudResponse[]; 
    return axiosResponses.map( r => { 
      const parsedCollection = ParseCollection(r.data); 
      return {...r, data:parsedCollection} as ICrudResponse; 
    }); 
  } 

  // Validate .............................................
  public async Validate(accessor:string, entries:IEntry[]) { 
    return await axios.put(this.baseUrl+'validate/'+accessor, entries); 
  } 

  // Ids ..................................................
  public async Ids(accessor:string): Promise<string[]>{ 
    return (await axios.get(this.baseUrl+'ids/'+accessor)).data; 
  } 


  //?? public async CreateUpdate ?? 


  // Create ...............................................
  public async Create(accessor:string, entries:IEntry[]): Promise<ICrudResponse[]> { 
    const toCreate = entries.map(e => { 
      const {_id, _v, ...data} = e; 
      return data; 
    }); 
    return (await axios.put(this.baseUrl+'create/'+accessor, toCreate)).data; 
  } 

  // ICrudResponse ?? or IEntry ??
  // Read .................................................
  public async Read(accessor:string, ids?:string[]): Promise<ICrudResponse[]> {
    return (await axios.put(this.baseUrl+'read/'+accessor, ids)).data; 
  }

  // Update ...............................................
  public async Update(accessor:string, entries:IEntry[]): Promise<ICrudResponse[]> { 
    return (await axios.put(this.baseUrl+'update/'+accessor, entries)).data; 
  }

  // Delete ...............................................
  /* Sends an array of objects with the only property being '_id' ... [{_id}] */
  public async Delete(modelName:string, entries:IEntry[]): Promise<ICrudResponse[]> { 
    const toDelete = entries.map(e => { 
      const {_id, ...data} = e; 
      return {_id}; 
    }); 
    return (await axios.put(this.baseUrl+'delete/'+modelName, toDelete)).data; 
  } 
} 