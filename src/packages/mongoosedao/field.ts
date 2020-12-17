// Field class 
export default class Field { 
  public ifield:IField = {} as IField;

  constructor(ifield:IField) { 
    this.ifield = ifield; 
  } 

  public GetEnumOptions() { 
    if(!this.IsEnum()) 
      return []; 
    return this.ifield.options['enum']; 
  }

  public GetElementType():string { 
    return this.IsObjectID() ? this.ifield.modeltype: this.ifield.subtype; 
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
      return this.ifield.options['abbreviate'] 
        || (this.IsString() || this.IsNumber() ); 
  } 

  public IsSortable():boolean { 
    return this.ifield.options['sort']; 
  } 

  public IsHiddenField():boolean { 
    return this.ifield.accessor.includes('_'); 
  } 

  public IsPrimitive():boolean { 
    return !this.IsEnum() && (this.IsNumber() || this.IsString() || this.IsBoolean()); 
  }

  public IsMixed():boolean { 
    const toTest = !this.IsArray() ? this.ifield.type: this.ifield.subtype; 
    return toTest === 'Mixed' || toTest === 'mixed'; 
  }

  public IsBoolean():boolean { 
    const toTest = !this.IsArray() ? this.ifield.type: this.ifield.subtype; 
    return toTest === 'Boolean' || toTest === 'boolean'; 
  } 

  public IsNumber():boolean { 
    const toTest = !this.IsArray() ? this.ifield.type: this.ifield.subtype; 
    return toTest === 'Number' || toTest === 'number'; 
  } 
  
  public IsString():boolean { 
    //console.log('toTest'); 
    const toTest = !this.IsArray() ? this.ifield.type: this.ifield.subtype; 
    //console.log([toTest, toTest === 'String' || toTest === 'string']); 
    return toTest === 'String' || toTest === 'string'; 
  } 

  public IsObjectID():boolean { 
    const toTest = !this.IsArray() ? this.ifield.type: this.ifield.subtype; 
    return toTest === 'ObjectID'; 
  } 

  public IsArray():boolean { 
    return this.ifield.type === 'Array'; 
  } 

  public IsEnum():boolean { 
    if(!this.ifield.options['enum']) 
      return false; 
    return true; 
  } 

  
}

