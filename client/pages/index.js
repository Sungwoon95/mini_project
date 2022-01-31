import React,{useState,useEffect} from 'react'
import axios from 'axios'
import {Pagination} from 'swiper'
import { Swiper, SwiperSlide} from 'swiper/react';
import {useRouter} from 'next/router'
import {dataFetcher, NewDatFetcher} from '../dataFetcher'
import PageView from './components/layout/PageView'
import CardView from './components/layout/CardView'
import Sort from './components/layout/Sort';
import PageDetail from './components/layout/PageDetail';

import 'swiper/css/pagination';

const Home = () => {
  const {loadContent, isLoading} = dataFetcher("new", 5)
  // const {newContent, isLoad} = NewDatFetcher("top",5)
  const [pageType, setPageType] = useState(true);

  const toggleView = () => {
    setPageType(!pageType)
  }

  return(
    <div>
      <h2 className='container Home__rank'>Total<br/> Ranking 5 Now</h2>
      {isLoading 
      ?
      <p>Loadgin</p> 
      :
      <div className="CardView__wrap">
      {<Swiper modules={[Pagination]}
      pagination={{clickable: true}}>
        {loadContent.map((item, idx)=>(
            <SwiperSlide>
              <CardView key={item.id} ms={item} idx={idx+1} />
            </SwiperSlide>
        ))}
      </Swiper>}
      </div>} 
      <div className="container">
      <h3 className="Home__news">
        Enjoy Hacker News
      </h3>
      <button onClick={toggleView}>
        {pageType? "자세히" :"일반"}
      </button>
        {pageType? loadContent.map((item,idx)=>(
      <PageDetail key={idx} ms={item} idx={idx+1}/>
      )):
      loadContent.map((item,idx)=>(
        <PageView key={idx} ms={item} idx={idx+1}/>
        ))
      }
      </div>
    </div>
    )
}

export default Home;