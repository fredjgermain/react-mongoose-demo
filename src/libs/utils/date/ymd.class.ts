import { ParseDate } from './date.utils';


export class YMD { 
  public date:Date = new Date(); 
  constructor(ymd?:string|Date) { 
    this.date = ymd ? new Date(ymd) : new Date(); 
  } 

  public ParseYMD():{year: number, month: number, day: number} 
  { 
    return ParseDate(this.date); 
  } 

  public StringYMD():string { 
    const {year, month, day: date}  = this.ParseYMD(); 
    return `${year}-${month}-${date}`; 
  } 

  public static IsSameDay(a:Date|string, b:Date|string) { 
    const A = new YMD(a).ParseYMD(); 
    const B = new YMD(b).ParseYMD(); 
    return A.day === B.day && A.month === B.month && A.year === B.year; 
  } 

  public static IsBefore(a:Date|string, b:Date|string) { 
    const A = new YMD(a).ParseYMD(); 
    const B = new YMD(b).ParseYMD(); 
    return (A.year < B.year || A.month < B.month || A.day < B.day) 
  } 
} 