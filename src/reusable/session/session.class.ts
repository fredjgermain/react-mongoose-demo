import { GetValueAt, SetValueAt } from "../_utils";



interface ISession { 
  sessionName:string; 
  time:{ 
    start:number; 
    last:number; 
    duration?:number; 
  } 
  value:any; 
} 

export class Session { 
  //public start:number = Date.now(); 

  //private static callBacks:

  public static Start(sessionName:string, value:any = {}) { 
    if(Session.Exists(sessionName)) 
      return; 
    const time = {start:Date.now(), last:Date.now()} 
    const session = {sessionName, time, value} as ISession; 
    Session.SetSession(session); 
  } 

  public static Exists(sessionName:string):boolean { 
    const session = Session.GetSession(sessionName); 
    return session ? true: false; 
  } 

  public static Get(sessionName:string, keys:string[] = []) { 
    const session = Session.GetSession(sessionName); 
    if(!session) 
      return; 
    Session.SetLastTime(session); 
    return GetValueAt(session, ["value", ...keys]); 
  } 

  public static Set(sessionName:string, newValue:any, keys:string[] = []) { 
    const session = Session.GetSession(sessionName); 
    if(!session) { 
      Session.Start(sessionName, newValue); 
      return; 
    }
    const newSession = SetValueAt(session, newValue, ["value", ...keys]); 
    Session.SetLastTime(newSession); 
    Session.SetSession(newSession); 
  } 

  public static GetElapseTime(sessionName:string) { 
    const session = Session.GetSession(sessionName); 
    if(!session) 
      return -1; 
    return Date.now() - session?.time.last; 
  } 

  public static IsExpired(sessionName:string) { 
    const session = Session.GetSession(sessionName); 
    if(!session) 
      return false; 
    if(!session.time.duration) 
      return false; 
    return session.time.duration <= Date.now() - session.time.last; 
  } 

  public static EndSession(sessionName:string) { 
    if(!Session.Exists(sessionName)) 
      return false; 
    window.sessionStorage.removeItem(sessionName); 
    return true; 
  } 

  private static SetLastTime(session:ISession|undefined) { 
    if(session) {
      session.time.last = Date.now(); 
    }
  } 

  public static GetSession(sessionName:string):ISession|undefined { 
    const toParse = window.sessionStorage.getItem(sessionName) ?? ''; 
    return toParse ? JSON.parse(toParse) as ISession: undefined; 
  } 

  private static SetSession(session:ISession) { 
    window.sessionStorage.setItem(session.sessionName ?? '', JSON.stringify(session)); 
  }

}



export class TimeOut { 
  public interval:number; 
  constructor(callback:() => void, duration:number) { 
    const func = () => { 
      callback(); 
      window.clearTimeout(this.interval+1); 
    } 
    this.interval = window.setTimeout(func, duration); 
  } 
} 

