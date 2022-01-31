import React,{useState,useEffect} from 'react'
import axios from 'axios'
import {useRouter} from 'next/router'
import {dataFetcher} from '../dataFetcher'
import PageView from './components/layout/pageView'
import Sort from './components/layout/Sort'


const Show = (props) => {
  const {loadContent, isLoading} = dataFetcher("show",'1')

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

export default Show;