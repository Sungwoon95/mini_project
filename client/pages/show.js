import React,{useState,useEffect, useRef, useContext} from 'react'
import {dataFetcher} from '../dataFetcher'
import APIfetcher from '../APIfetcher'
import PageView from './components/layout/pageView'
import PageDetail from './components/layout/pageDetail'
import Sort from './components/layout/Sort'
import useInfiniteScroll from './hooks/useInfiniteScroll'
import loadContent from './hooks/loadContent'
import {PageTypeContext} from './contexts/viewType.js'

const Show = (props) => {
  const [content, setContent] = useState([])
  const [endScroll, setEndScroll] = useState(true)
  const fetchMore = useRef(null)
  const intersecting = useInfiniteScroll(fetchMore)
  
  const [{isDetail}, toggleView] =useContext(PageTypeContext)

  const getContent = async() => {
    const newContents = await APIfetcher ('get','/show/content/scroll', {
      params:{cursor: content[content.length - 1]?.id || ''}}
      )
      if (newContents.length === 0){
        setEndScroll(false)
      }
    setContent(content=>[...content,...newContents])
  }
  useEffect (() => {
    if(intersecting && endScroll) getContent()

  },[intersecting,content])

  console.log('show render')
  return(
    <div>
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
    <div className='container'>
    {isDetail? content.map((item,idx)=>(
      <PageDetail key={idx} ms={item} idx={idx+1}/>
      )):
      content.map((item,idx)=>(
        <PageView key={idx} ms={item} idx={idx+1}/>
        ))
      }
    </div>
    <div ref={fetchMore} />
  </div>
  )
}

export default Show;