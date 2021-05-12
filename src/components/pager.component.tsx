import { IPageHook, PageOfPages, PagerBtn } from '../libs/pager/_pager'; 

export function Pager<T>({paging}:{paging:IPageHook<T>}) { 
  return <div className={'pager'}> 
    <PageOfPages {...{paging}} /> 
    <PagerBtn {...{paging}} /> 
  </div> 
}