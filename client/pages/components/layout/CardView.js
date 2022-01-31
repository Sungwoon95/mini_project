import React from 'react';

// import Page from './Page';
// import {dataFetcher} from '../../../dataFetcher'

const CardView = ({ms: {id,by, title, kids, time, url, descendants, score}, idx}) => {
  
  const idxNum = ('00' + idx).slice(-3)
  
  
  return(
      <div className="CardView">
        <div className="CardView__main">
          <span className="CardView__rank">{idxNum}</span>
          <h3 className="CardView__title">{title}</h3>
        </div>
        <div className="CardView__info">
          <p className="CardView__info--user">
            {by}
          </p>
        </div>
        {/* <p>{url}</p> */}
      </div>
  )
}

export default CardView;