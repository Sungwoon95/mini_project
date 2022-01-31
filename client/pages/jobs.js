import React,{useState,useEffect} from 'react'
import {useRouter} from 'next/router'
import {dataFetcher} from '../dataFetcher'
import PageView from './components/layout/pageView'
import Sort from './components/layout/Sort'

const Jobs = () => {
  const {loadContent, isLoading} = dataFetcher("job")

  return(
  <div className="container">
    <Sort />
    {isLoading 
    ?
    <p>Loadgin</p> 
    :
    <>
    {loadContent.map((item,idx)=>(
      <PageView key={item.id} ms={item} idx={idx+1}/>
    ))}
    </>}    
  </div>
  )
}

export default Jobs;