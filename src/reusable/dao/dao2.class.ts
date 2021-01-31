import {IsEmpty, GetDefaultValueFromIField} from '../_utils'; 
import {Collection} from './collection.class'; 



export interface ICrud { 
  Collections:(accessors?:string[]) => Promise<ICrudResponse[]>; 
  Create: (accessor:string, toCreate:IEntry[]) => Promise<ICrudResponse[]>; 
  Read: (accessor:string, id?:string[]) => Promise<ICrudResponse[]>;          /// ??
  Update: (accessor:string, toUpdate:IEntry[]) => Promise<ICrudResponse[]>; 
  Delete: (accessor:string, toDelete:IEntry[]) => Promise<ICrudResponse[]>; 
} 

function OrderedPick(src:any[], key:string, values:string[]):any[] { 
  const picked = [] as any[]; 
  values.forEach(v => { 
    const pick = src.find(s => s[key] === v);
    if(pick) 
      picked.push(pick); 
  })
  return picked; 
}


// DAO #############################################
export class DAO { 
  public collections:ICollection[] = [] as ICollection[]; 

  private crud:ICrud = {} as ICrud; 

  constructor(crud:ICrud) { 
    this.crud = crud; 
  } 

  // Get ICollections ----------------------------- 
  public GetICollections(accessors?:string[]):ICollection[] { 
    if(!accessors) 
      return this.collections; 
    return OrderedPick(this.collections, 'accessor', accessors); 
  } 

  // Get IFields -----------------------------------
  public GetIFields(icollectionAccessor:string, ifieldsAccessors?:string[]):IField[] { 
    const collection = this.collections.find(c => c.accessor === icollectionAccessor); 
    if(!ifieldsAccessors) 
      return collection?.ifields ?? []; 
    return OrderedPick(collection?.ifields?? [], 'accessor', ifieldsAccessors); 
  }

  public GetIEntries(icollectionAccessor:string, ids?:string[]):IEntry[] {
    const collection = this.collections.find(c => c.accessor === icollectionAccessor); 
    if(!ids)
      return collection?.entries ?? []; 
    return OrderedPick(collection?.entries ?? [], '_id', ids); 
  }
  
  // GET FOREIGN ELEMENTS -----------------------------
  public GetForeignElements(ifield:IField) 
    : {foreignCollection:ICollection|undefined, abbrevField:IField|undefined} 
  { 
    const foreignCollection = this.collections.find(c => c.accessor === ifield.type); 
    const abbrevField = foreignCollection?.ifields.find(f=>f.isAbbrev); 
    return {foreignCollection, abbrevField}; 
  } 

  // Get Options ----------------------------------------
  public GetOptions(ifield:IField):IOption[] { 
    if(ifield.enums)
      return ifield.enums.map(e => {return {value:e, label:e}}); 
    if(!ifield.isModel)
      return [] as IOption[]; 
    const {foreignCollection, abbrevField} = this.GetForeignElements(ifield); 
    if(!foreignCollection || !abbrevField) 
      return [] as IOption[]; 
    return foreignCollection.entries?.map( e => { 
      return {value:e._id, label:e[abbrevField.accessor]} as IOption; 
    }); 
  } 


  // COLLECTIONS -------------------------------------------
  public async Collections(accessors?:string[]):Promise<ICrudResponse[]> {
    const responses = [] as ICrudResponse[]; 
    

    for(let i=0; i<accessors.length; i++) { 
      const response = await this.Collection(accessors[i]); 
      responses.push(response); 
    } 
    return responses; 
  }




}