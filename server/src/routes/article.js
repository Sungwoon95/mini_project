import axios from 'axios'

axios.defaults.baseURL = 'https://hacker-news.firebaseio.com/v0'

const localURL = 'http://localhost:8000'

const getArticle = (req,res,category) => {
  const ids = axios.get(category).then(response=> {
    return res.json(response.data)})
      .catch(err => console.error(err))
  
  return ids
}

const getComment = (req,res,param) => {
  axios.get(localURL+param).then(response => {
    const resp = response.data.kids
    if (!resp) return

    const commentMap = resp.map(item=> {
      return axios.get(`/item/${item}.json`)
    })
    axios.all(commentMap).then(axios.spread((...rest)=>{
      
      const comments = rest.map(item => {
        return item.data
      })
      
      const notNull = comments.filter(item=> item !== null)
      console.log(notNull)
      res.send(notNull)
    })
    )
  })
}

const getReply = (req,res,param) => {
  axios.get(localURL+param).then(response=>
    res.send(response.data)
    )
}

const getComment1 = (req,res,param) => {
  axios.get(localURL+param).then(response=> {
    const resp = response.data 
    
    //const content = resp.map(item=>{
    //  const fetch = axios.get(`item/${item}.json`)
    //  return fetch
    //})

  //  axios.all(
  //    content
  //  ).then(axios.spread((...rest) => {
  //    const contentMap = rest.map(item=> item.data)
  //    //const fromIndex = b.findIndex(item=> item.id === cursor) + 1
//
  //    res.send(contentMap)
//
  //    //console.log(contentMap)
  //    
  //}))
  }).catch(err => console.error(err))
}




export const articleRoutes=[
  { //get
    method: 'get',
    route: '/article/:id',
    handler: ({params:{id}},res)=> {
      getArticle(id,res,`/item/${id}.json`)
    }
  }
]

export const commentRoutes=[
  { //get
    method: 'get',
    route: '/comment/:id',
    handler: ({params:{id}},res)=> {
      getComment(id,res,`/article/${id}`)
    }
  }
]

export const commentReplyRoutes=[
  { //get
    method: 'get',
    route: '/commentReply/:id',
    handler: ({params:{id}},res)=> {
      getReply(id,res,`/comment/${id}`)
    }
  }
]