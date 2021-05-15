import React, { useEffect, useState } from 'react'; 

//https://dev.to/imjoshellis/simple-download-text-file-link-with-react-29j3


export function DownLoadFile({list}:{list:string[]}) { 
  const [link, SetLink] = useState(''); 

  function MakeFile() { 
    const data = new Blob([list.join('\n')], {type:'text/plain'}); 
    if(link !== '') window.URL.revokeObjectURL(link); 
    SetLink(window.URL.createObjectURL(data)); 
  } 

  useEffect(() => { 
    MakeFile(); 
  }, [list]) 

  return <a href={link} download={'list.txt'}>DownLoad file</a> 
} 