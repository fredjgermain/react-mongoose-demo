import { ParseDate } from './date.utils';


export class YMD { 
  public date:Date = new Date(); 
  constructor(ymd?:string) { 
    this.date = ymd ? new Date(ymd) : new Date(); 
  } 

  public ParseYMD():{year: number, month: number, date: number} 
  { 
    return ParseDate(this.date); 
  } 

  public StringYMD():string { 
    const {year, month, date}  = this.ParseYMD(); 
    return `${year}-${month}-${date}`; 
  } 
} 