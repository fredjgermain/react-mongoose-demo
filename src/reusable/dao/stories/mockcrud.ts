import {Collection} from '../collection.class'; 
import {ICrud} from '../dao.class'; 
import {mockDb} from './mockdb'; 



function GetMockCollections(accessors?: string[] | undefined) { 
  if(!accessors) 
    return mockDb; 
  const collections:ICollection[] = []; 
  accessors?.forEach( accessor => { 
    const found = mockDb.find( c => c.accessor===accessor); 
    if(found) 
      collections.push(found); 
  }) 
  return collections; 
}


// Collections ..........................................
async function Collections(accessors?: string[] | undefined): Promise<ICrudResponse[]> { 
  const collections = GetMockCollections(accessors); 
  return collections.map( data => { 
    return {actionType:'read', success:true, data, err:[]} as ICrudResponse; 
  })
}

// Create ...............................................
async function Create(accessor:string, entries:IEntry[]): Promise<ICrudResponse[]> { 
  const toCreate = entries.map(e => { 
    const {_id, _v, ...data} = e; 
    return data; 
  }); 

  const [icollection] = GetMockCollections([accessor]); 
  const collection = new Collection(icollection); 

  // increment ids ...
  collection.Create(entries); 
  return entries.map( data => { 
    return {actionType:'create', success:true, data, err:[]} as ICrudResponse; 
  }) 
} 

// Read .................................................
async function Read(accessor:string, ids?:string[]): Promise<ICrudResponse[]> {
  const [icollection] = GetMockCollections([accessor]); 
  const collection = new Collection(icollection); 
  const read = collection.Read(ids);
  return read.map( data => { 
    return {actionType:'read', success:true, data, err:[]} as ICrudResponse; 
  }) 
}

// Update ...............................................
async function Update(accessor:string, entries:IEntry[]): Promise<ICrudResponse[]> { 
  const [icollection] = GetMockCollections([accessor]); 
  const collection = new Collection(icollection); 
  collection.Update(entries); 
  return entries.map( data => { 
    return {actionType:'update', success:true, data, err:[]} as ICrudResponse; 
  }) 
}

// Delete ...............................................
/* Sends an array of objects with the only property being '_id' ... [{_id}] */
async function Delete(accessor:string, entries:IEntry[]): Promise<ICrudResponse[]> { 
  const [icollection] = GetMockCollections([accessor]); 
  const collection = new Collection(icollection); 
  collection.Delete(entries); 
  return entries.map( data => { 
    return {actionType:'delete', success:true, data, err:[]} as ICrudResponse; 
  }) 
} 

// MockCrud
export const crud:ICrud = { 
  Collections, 
  Create, 
  Delete, 
  Read, 
  Update} 