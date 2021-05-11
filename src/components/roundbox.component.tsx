import React from 'react'; 
import '../css/main.css'; 

export function RoundBox({children}:React.PropsWithChildren<{}>) { 
  return <div className={'roundbox'}> 
    {children} 
  </div> 
} 