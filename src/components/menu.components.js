import React from 'react'; 
import {Link} from 'react-router-dom'; 

export function Nav(props) { 

  return <div> 
    NAVIGATION 
    <Link to='/' >Page 1</Link> 
    <Link to='/page2' >Page 2</Link> 
  </div> 
} 