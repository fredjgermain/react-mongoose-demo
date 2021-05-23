import React, { useEffect, useState } from 'react'; 

//https://dev.to/imjoshellis/simple-download-text-file-link-with-react-29j3


export function DownLoadFile({linkLabel, fileName, content}:{linkLabel:string, fileName:string, content:string}) { 
  const [link, SetLink] = useState(''); 

  function MakeFile() { 
    const data = new Blob([content], {type:'text/plain'}); 
    if(link !== '') window.URL.revokeObjectURL(link); 
    SetLink(window.URL.createObjectURL(data)); 
  } 

  useEffect(() => { 
    MakeFile(); 
  }, [content, fileName]) 

  return <a href={link} download={fileName}>{linkLabel}</a> 
} 