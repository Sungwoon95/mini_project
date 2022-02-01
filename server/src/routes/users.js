import axios from 'axios'
axios.defaults.baseURL = 'https://hacker-news.firebaseio.com/v0'

const getUsers = (id,res,category) => {
  const ids = axios.get(category).then(response=> {
    return res.json(response.data)})
      .catch(err => console.error(err))
  
      console.log(id)
  return ids
}

export const userRoutes = [
  { //get
    method: 'get',
    route: '/id/:id',
    handler: ({params:{id}},res)=> {
      
      getUsers(id,res,`/user/${id}.json`)
    }
  },
  
]