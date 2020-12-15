import {IMongooseField, IMongooseCollection} from '../../mongoosedao/mongooseparser'; 
//import { IEntry } from '../../tablecomponent/tableinterfaces'; 

export interface IPlayer extends IEntry { 
  class: String; 
  name:String; 
  age:Number; 
  sex:String; 
}

export interface IClass extends IEntry { 
  classname:String; 
} 

const playersFields:Array<IMongooseField> = [
  {
    accessor:'_id', 
    instance: 'String', 
    /*$embeddedSchemaType: { 
      instance: '', 
    }, */ 
    options: { 
      ref: 'classes', 
      label: 'Identifier', 
      // defaultValue: 
      // default: 
      // format: 
    }, 
  },
  {
    accessor:'class', 
    instance: 'ObjectID', 
    /*$embeddedSchemaType: { 
      instance: '', 
    }, */ 
    options: { 
      ref: 'classes', 
      label: 'Identifier', 
      // defaultValue: 
      // default: 
      // format: 
    }, 
  },
  {
    accessor:'name', 
    instance: 'String', 
    /*$embeddedSchemaType: { 
      instance: '', 
    }, */ 
    options: { 
      //ref: '', 
      label: 'Name', 
      // defaultValue: 
      // default: 
      // format: 
    }, 
  }, 
  {
    accessor:'age', 
    instance: 'Number', 
    /*$embeddedSchemaType: { 
      instance: '', 
    }, */ 
    options: { 
      //ref: '', 
      label: 'Age', 
      min: 0, 
      max: 130, 
      // defaultValue: 
      // default: 
      // format: 
    }, 
  }, 
  {
    accessor:'sex', 
    instance: 'String', 
    /*$embeddedSchemaType: { 
      instance: '', 
    }, */ 
    options: { 
      //ref: '', 
      label: 'Sex', 
      enum: ['male', 'female'], 
      // defaultValue: 
      // default: 
      // format: 
    }, 
  } 
] 

const classesFields:Array<IMongooseField> = [
  {
    accessor:'_id', 
    instance: 'String', 
    /*$embeddedSchemaType: { 
      instance: '', 
    }, */ 
    options: { 
      //ref: '', 
      label: 'Identifier', 
      // defaultValue: 
      // default: 
      // format: 
    }, 
  }, 
  {
    accessor:'classname', 
    instance: 'String', 
    /*$embeddedSchemaType: { 
      instance: '', 
    }, */ 
    options: { 
      //ref: '', 
      label: 'Class name', 
      // defaultValue: 
      // default: 
      // format: 
    }, 
  } 
] 

export const mockFields = { 
  players:playersFields, 
  classes:classesFields, 
}; 

export const mockCollections:Array<IMongooseCollection> = [ 
  {
    accessor:'players', 
    label: 'Players', 
  }, 
  { 
    accessor:'classes', 
    label: 'Classes', 
  }, 
]; 
