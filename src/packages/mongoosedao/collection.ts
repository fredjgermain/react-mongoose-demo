import Field from './field'; 


export default class Collection { 
  public icollection:ICollection = {} as ICollection; 

  constructor(collection:ICollection) { 
    this.icollection = collection; 
  }

  // Get default Entry --------------------------
  public GetDefaultEntry():IEntry { 
    const entry:IEntry = {} as IEntry; 
    this.icollection.ifields.forEach( (f) => { 
      entry[f.accessor] = f.defaultValue; 
    }); 
    return entry; 
  } 

  public GetAbbreviateField():IField { 
    let foundAbvField = this.icollection.ifields.find(c => c.options['abbreviate']); 
    if(foundAbvField) 
      return foundAbvField; 
    foundAbvField = this.icollection.ifields.find( f => new Field(f).IsAbbreviable() ); 
    return foundAbvField as IField; 
  } 

  // Called after a successful crud.create 
  public Create(entry:IEntry) { 
    this.icollection.entries.push(entry); 
  } 

  // Called after a successful crud.update 
  public Update(entry:IEntry) { 
    const index = this.icollection.entries.findIndex( e => e._id === entry._id ); 
    if(index < 0) 
      return; 
    this.icollection.entries[index] = {...entry}; 
  }

  // Called after a successful crud.delete 
  public Delete(entry:IEntry) { 
    const index = this.icollection.entries.findIndex( e => e._id === entry._id ); 
    if(index < 0) 
      return; 
    this.icollection.entries.splice(index, 1); 
  } 
}

