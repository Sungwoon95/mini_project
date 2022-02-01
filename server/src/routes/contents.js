import axios from 'axios'

axios.defaults.baseURL = 'https://hacker-news.firebaseio.com/v0/item'

const getStory = (req,res,category) => {
  const stories = axios.get(category).then(response=> {
    return res.json(response.data)})
      .catch(err => console.error(err))
  
  return stories
}

export const storyRoute = [
  {
      method: "get",
      route: "/item/:id",
      handler: ({params:{id}},res) => {
        getStory(req,res,`/30.json`)
      },
  },
  {
      method: "get",
      route: "/user/:id",
      handler: ({params:{id}}, res) =>{
          try{
              const user = getUser()
              const userId = user[id]
              if(!userId)throw Error('사용자없음')
              res.send(userId)
          }
          catch(err){
              res.status(500).send({error:err})
          }
      }
  }
]

//const category = {
//  new:"/newstories.json",
//  hot:"/newstories.json",
//  show:"/newstories.json",
//  ask:"/newstories.json",
//  job:"/newstories.json",
//}
//
//const ReadAPI = (target) => {
//  try{
//    return category[target]
//  }
//  catch(err){console.error(err)}
//}
//
//
//const getContents =async (req,res,id) => {
//  try{
//    const contents = await axios.get(`/item/${id}.json`).then(response=>(response.data)).then(
//      axios
//    )
//    .catch(err => console.error(err))
//
//    return contents
//    }
//  catch(err){console.error(err)}
//
//  
//}
//
//const Arr = async (req,res,target) => {
//  const ids = [axios.get(ReadAPI(target)).then(response=> res.json(response.data))
//    .catch(err => console.error(err))]
//  try{
//
//  const content = await Promise.all(
//    ids.map(id=>getContents(id))
//  )
//  return content
//  }catch(err){console.error(err)}
//}
//export const contentRoutes = [
//  { //get
//    method: 'get',
//    route: '/top/contents',
//    handler: (req,res)=> {
//      Arr(req,res,'new')
//    }
//  },
//  { //get
//    method: 'get',
//    route: '/new/contents',
//    handler: (req,res)=> {
//      axios.get(contentUrl+'/5000.json').then(response=> res.json(response.data))
//      .catch(err => console.error(err))
//    }
//  },{ //get
//    method: 'get',
//    route: '/ask/contents',
//    handler: (req,res)=> {
//      axios.get(contentUrl+'/5000.json').then(response=> res.json(response.data))
//      .catch(err => console.error(err))
//    }
//  },{ //get
//    method: 'get',
//    route: '/show/contents',
//    handler: (req,res)=> {
//      axios.get(contentUrl+'/5000.json').then(response=> res.json(response.data))
//      .catch(err => console.error(err))
//    }
//  },{ //get
//    method: 'get',
//    route: '/job/contents',
//    handler: (req,res)=> {
//      axios.get(contentUrl+'/jobstories.json').then(response=> res.json(response.data))
//      .catch(err => console.error(err))
//    }
//  },
//]
//