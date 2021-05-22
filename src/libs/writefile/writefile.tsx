import React, { useEffect, useState } from 'react'; 

//https://dev.to/imjoshellis/simple-download-text-file-link-with-react-29j3


export function DownLoadFile({fileName, content}:{fileName:string, content:string[]}) { 
  const [link, SetLink] = useState(''); 

  function MakeFile() { 
    const data = new Blob([content.join('\n')], {type:'text/plain'}); 
    if(link !== '') window.URL.revokeObjectURL(link); 
    SetLink(window.URL.createObjectURL(data)); 
  } 

  useEffect(() => { 
    MakeFile(); 
  }, [content, fileName]) 

  return <a href={link} download={fileName}>DownLoad file</a> 
} 