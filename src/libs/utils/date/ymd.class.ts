import { ParseDate } from './date.utils';


export class YMD { 
  public date:Date = new Date(); 
  constructor(ymd?:string|Date) { 
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

  public static SameDay(a:Date|string, b:Date|string) { 
    const A = new YMD(a).ParseYMD(); 
    const B = new YMD(b).ParseYMD(); 
    return A.date === B.date && A.month === B.month && A.year === A.year; 
  } 
} 