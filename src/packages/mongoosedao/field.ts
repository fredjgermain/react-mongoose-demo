// Field class 
export default class Field implements IField { 
  public accessor: string = ''; 
  public label: string = ''; 
  public type: string = ''; 
  public subtype: string = ''; 
  public modeltype: string = ''; 
  public options: any = {}; 
  public defaultValue: any = ''; 
  public format: any = ''; 
  public sort?: any = ''; 
  

  /*constructor(ifield:IField) { 
    this.ifield = ifield; 
  } */

  public GetEnumOptions() { 
    if(!this.IsEnum()) 
      return []; 
    return this.options['enum']; 
  }

  public GetElementType():string { 
    return this.IsObjectID() ? this.modeltype: this.subtype; 
  }

  // Type Testing ----------------------------
  public OnePrimitive = ():boolean => !this.IsArray() && this.IsPrimitive(); 
  public ManyPrimitive = ():boolean => this.IsArray() && this.IsPrimitive(); 
  public OneMixed = ():boolean => !this.IsArray() && this.IsMixed(); 
  public ManyMixed = ():boolean => this.IsArray() && this.IsMixed(); 
  public OneEnum = ():boolean => !this.IsArray() && this.IsEnum(); 
  public ManyEnum = ():boolean => this.IsArray() && this.IsEnum(); 
  public OneForeign = ():boolean => !this.IsArray() && this.IsObjectID(); 
  public ManyForeign = ():boolean => this.IsArray() && this.IsObjectID(); 

  public IsAbbreviable():boolean { 
      if(this.IsHiddenField()) 
        return false; 
      return this.options['abbreviate'] 
        || (this.IsString() || this.IsNumber() ); 
  } 

  public IsSortable():boolean { 
    return this.options['sort']; 
  } 

  public IsHiddenField():boolean { 
    return this.accessor.includes('_'); 
  } 

  public IsPrimitive():boolean { 
    return !this.IsEnum() && (this.IsNumber() || this.IsString() || this.IsBoolean()); 
  }

  public IsMixed():boolean { 
    const toTest = !this.IsArray() ? this.type: this.subtype; 
    return toTest === 'Mixed' || toTest === 'mixed'; 
  }

  public IsBoolean():boolean { 
    const toTest = !this.IsArray() ? this.type: this.subtype; 
    return toTest === 'Boolean' || toTest === 'boolean'; 
  } 

  public IsNumber():boolean { 
    const toTest = !this.IsArray() ? this.type: this.subtype; 
    return toTest === 'Number' || toTest === 'number'; 
  } 
  
  public IsString():boolean { 
    //console.log('toTest'); 
    const toTest = !this.IsArray() ? this.type: this.subtype; 
    //console.log([toTest, toTest === 'String' || toTest === 'string']); 
    return toTest === 'String' || toTest === 'string'; 
  } 

  public IsObjectID():boolean { 
    const toTest = !this.IsArray() ? this.type: this.subtype; 
    return toTest === 'ObjectID'; 
  } 

  public IsArray():boolean { 
    return this.type === 'Array'; 
  } 

  public IsEnum():boolean { 
    if(!this.options['enum']) 
      return false; 
    return true; 
  } 

  
}

