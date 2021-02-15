
import { GetValueAt, SetValueAt } from "../_utils";


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

export class Timer { 
  public start:number = 0; 
  public delay:number = 0; 
  public callback:() => void = () => {console.log('timeout!')}; 
  
  constructor(callback:()=>void, delay?:number) { 
    this.delay = delay && delay > 0 ? delay: 1000; 
    this.start = Date.now(); 
  } 

  public async Run() { 
    while(this.delay > 0) { 
      this.delay = this.delay - (Date.now() - this.start); 
    } 
    await this.callback(); 
  } 
}




interface ISession { 
  sessionName:string; 
  time:{ 
    starttime:number; 
    lasttime:number; 
    duration?:number; 
  } 
  
  value:any; 
} 

interface IExpiration { 
  callback:() => void; 
  duration:number; 
} 

// Call back when session Expires ?
export class Session { 
  //public start:number = Date.now(); 

  //private static callBacks:

  public static StartSession(sessionName:string, expiration?:IExpiration ) { 
    const time = {starttime:Date.now(), lasttime:Date.now(), duration:expiration?.duration}; 
    const session = {sessionName, time} as ISession; 
    Session.SetSession(session); 

    if(expiration) { 
      //var interval = window.setInterval(expiration.callback); 
      const callback = () => { 
        expiration.callback(); 
      } 
      window.setTimeout(callback, expiration.duration); 
    } 
  } 

  public static SessionExists(sessionName:string):boolean { 
    const session = Session.GetSession(sessionName); 
    return session ? true:false; 
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
    if(!session) 
      return; 
    const newSession = SetValueAt(session, newValue, ["value", ...keys]); 
    Session.SetLastTime(newSession); 
    Session.SetSession(newSession); 
  } 

  public static GetElapseTime(sessionName:string) { 
    const session = Session.GetSession(sessionName); 
    if(!session) 
      return -1; 
    return Date.now() - session.time.lasttime; 
  } 

  public static IsExpired(sessionName:string) { 
    const session = Session.GetSession(sessionName); 
    if(!session) 
      return false; 
    if(!session.time.duration) 
      return false; 
    return session.time.duration <= Date.now() - session.time.lasttime; 
  } 

  public static EndSession(sessionName:string) { 
    if(!Session.SessionExists(sessionName)) 
      return false; 
    window.sessionStorage.removeItem(sessionName); 
    return true; 
  } 

  private static SetLastTime(session:ISession) { 
    session.time.lasttime = Date.now(); 
  } 

  private static GetSession(sessionName:string):ISession|undefined { 
    const toParse = window.sessionStorage.getItem(sessionName) ?? ''; 
    return toParse ? JSON.parse(toParse) as ISession: undefined; 
  } 

  private static SetSession(session:ISession) { 
    window.sessionStorage.setItem(session.sessionName ?? '', JSON.stringify(session)); 
  }

}