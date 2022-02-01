import {useState, useEffect} from 'react'
import {useRouter} from 'next/router'
import APIfetcher from '../../APIfetcher'

const UserInfo = () => {
  const [article, setArticle] = useState({})
  const [comment, setComment] = useState([])
  const router = useRouter();
  const userId= router.query.id
  console.log(userId)
  const getArticle = async() => {
   const articlePage = await APIfetcher('get',`/article/${userId}`
   //,{params:{userId}}
   )
   setArticle(articlePage)
   console.log(article)
  }

  const getComment = async() => {
    const comments = await APIfetcher('get',`/comment/${userId}`
    //,{params:{userId}}
    )
    setComment(comments)
    console.log(comments)
   }

  useEffect(()=>{
   getArticle()
   getComment()
  },[])

  return (
    <div>
      {article.by}
      {/* {article.text} */}
      {comment.map((item,idx)=>(
        <div key={idx}>
          {item.by}
          {item.text}
        </div>
      ))}
    </div>
  )
}

export default UserInfo