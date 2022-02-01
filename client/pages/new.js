import React,{useState,useEffect, useRef, useContext} from 'react'
import {dataFetcher} from '../dataFetcher'
import APIfetcher from '../APIfetcher'
import PageView from './components/layout/pageView'
import PageDetail from './components/layout/pageDetail'
import Sort from './components/layout/Sort'
import useInfiniteScroll from './hooks/useInfiniteScroll'
import {ThemeContext} from './contexts/theme.js'

const New = () => {
  const [{theme, isDark}, toggleTheme] = useContext(ThemeContext);
  const [content, setContent] = useState([])
  const [endScroll, setEndScroll] = useState(true)
  const fetchMore = useRef(null)
  const intersecting = useInfiniteScroll(fetchMore)
  const [pageType, setPageType] = useState(true);
  const [isLoading,setIsLoading] = useState(false);

  const toggleView = () => {
    setPageType(!pageType)
  }

  const getContent = async() => {
    const newContents = await APIfetcher ('get','/new/content/scroll', {
      params:{cursor: content[content.length - 1]?.id || ''}}
      )
      if (newContents.length === 0){
        setEndScroll(false)
      }
    setContent(content=>[...content,...newContents])
    setIsLoading(true);
  }
  useEffect (() => {
    if(intersecting && endScroll) getContent()

  },[intersecting,content])
  return(
  <div className="container">
    <Sort />
    {/* {isLoading 
    ?
    <p>Loadgin</p> 
    :
    <>
    {loadContent.map((item,idx)=>(
      <PageView key={item.id} ms={item} idx={idx+1}/>
    ))}
    </>}     */}
    <button onClick={toggleView}>
        {pageType? "자세히" :"일반"}
      </button>
    {!isLoading 
    ? 
    '로딩중임미다.'
    :
    (pageType? content.map((item,idx)=>(
      <PageDetail key={idx} ms={item} idx={idx+1}/>
      )):
      content.map((item,idx)=>(
        <PageView key={idx} ms={item} idx={idx+1}/>
        )))
      }
    
    <div ref={fetchMore} />
  </div>
  )
}

export default New;