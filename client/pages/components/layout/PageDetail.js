import React,{useState} from 'react';
import Modal from './Modal.js'
//import Backdrop from '../shared/Backdrop'

const PageDetail = ({ms: {id,by, title, kids, time, url, descendants, score} , idx}) => {
  const [isOpen, setIsOpen] = useState(false)

  const openModal = () => {
    setIsOpen(true)
  }

  const closeModal = () => {
    setIsOpen(false)
  }
  const idxNum = ('00' + idx).slice(-3)
  
  const wroteTime = () => {
    const write = Math.round((Date.now() - (time*1000)) / (60 * 1000))
    
    if(write < 60){
      return `${write} minutes ago`
    }else if (write < 1440){
      return `${Math.round(write/60)} hours ago`
    }else if (write < 10080){
      return `${Math.round(write/1440)} days ago`
    }else if (write < 40320){
      return `${Math.round(write/10080)} weeks ago`
    }else if (write < 483840){
      return `${Math.round(write/40320)} months ago`
    }else{
      return `${Math.round(write/483840)} years ago`
    }
  }



  // const contentTime = new Date(time*1000).toLocaleString("ko-KR")
  return(
      <div className="PageDetail">
        <div className="PageDetail__number">
          <span className='PageDetail__rank'>
            {idxNum}
          </span>
          <span className='PageDetail__time'>
            {wroteTime()}
          </span>
        </div>
        <h3 className="PageDetail__title">{title}</h3>
        <div className="PageDetail__info">
          <button onClick={openModal}>
          <p className="PageDetail__info--user">
            {by}
            <span class="material-icons">
              navigate_next
            </span>
            {id}
          </p>
          </button>
          <div className="PageDetail__info--option">
            <p className="PageDetail__info--option-comment">{descendants}</p>
            <p className="PageDetail__info--option-score">{score}</p>
          </div>
        </div>
        {isOpen && <Modal userName={by} onClick={closeModal}/>}
        {/* <p>{url}</p> */}
      </div>
  )
}

export default PageDetail;