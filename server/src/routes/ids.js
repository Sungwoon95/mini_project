import request from 'request'
import axios from 'axios'

axios.defaults.baseURL = 'https://hacker-news.firebaseio.com/v0'

const localURL = 'http://localhost:8000'

const getIds = (req,res,category) => {
  const ids = axios.get(category).then(response=> {
    return res.json(response.data)})
      .catch(err => console.error(err))
  
  return ids
}

const filterIds = (req,res,category,removeId1, removeId2)=> {
  const removeArray = [removeId1, removeId2]
  const filterArray = [category, ...removeArray]
  
  const getFilter = filterArray.map(item=>{
    const fetch = axios.get(item)
    return fetch
  })

  axios.all(getFilter).then(axios.spread((fil,rem1,rem2)=>{
    const onRemove = [...rem1.data, ...rem2.data]
    const onFilter = [...fil.data] 
    
    const setFilter = onFilter.filter(item=> !onRemove.includes(item))
    
    //console.log(onFilter)
    console.log(setFilter)
    //console.log(onRemove)
    res.send(setFilter)
  }))
}

const getContents = (req,res,param) => {
  axios.get(localURL+param).then(response=> {
    const resp = response.data 
    
    const content = resp.map(item=>{
      const fetch = axios.get(`item/${item}.json`)
      return fetch
    })

    axios.all(
      content
    ).then(axios.spread((...rest) => {
      const contentMap = rest.map(item=> item.data)
      //const fromIndex = b.findIndex(item=> item.id === cursor) + 1

      res.send(contentMap)

      //console.log(contentMap)
      
  }))
  }).catch(err => console.error(err))
  //return contents
      //axios.all(getFilter).then(axios.spread((fil)=>{
  //  const contentUrl = '/item'
  //  const onFilter = [...fil.data]
  //  const setFilter = onFilter.filter(item=> item)
  //  console.log(contentUrl)
  //  //console.log(onFilter)
  //  //console.log(setFilter)
  //  //console.log(onRemove)
  //  res.send(setFilter)
  //}))
}

const getRank = (req,res,param) => {
  axios.get(localURL+param).then(response=> {
    const resp = response.data 
    
    const content = resp.map(item=>{
      const fetch = axios.get(`item/${item}.json`)
      return fetch
    })

    axios.all(
      content
    ).then(axios.spread((...rest) => {
      const contentMap = rest.map(item=> item.data)
      //const fromIndex = b.findIndex(item=> item.id === cursor) + 1

      res.send(contentMap.slice(0,5))

      //console.log(contentMap)
      
  }))
  }).catch(err => console.error(err))
  //return contents
      //axios.all(getFilter).then(axios.spread((fil)=>{
  //  const contentUrl = '/item'
  //  const onFilter = [...fil.data]
  //  const setFilter = onFilter.filter(item=> item)
  //  console.log(contentUrl)
  //  //console.log(onFilter)
  //  //console.log(setFilter)
  //  //console.log(onRemove)
  //  res.send(setFilter)
  //}))
}

const getScroll = async (cursor,res,param) => {
  const scroll = axios.get(localURL+param).then(response=>{
      const scrollData = response.data
    return scrollData
  }).catch(err => console.error(err))

  const scrollArray = await scroll
  const nullexcept = scrollArray.filter(item=> item !== null)
  const scrollIndex = nullexcept.findIndex(item=>{
    const scrollLength = item.id + '' === cursor
    return scrollLength
  })+1
  const scrollMap = nullexcept.map(item=> item)
  //const scrollCount = scrollArray.map(item=> item.id).slice(0,2)
  //const scrollData = scrollArray.findIndex(
  //item=> item.id === cursor)

  //const scrollMap = scrollArray.map(item=>item.id + '' === cursor)
  //const scrollData = response.data
  //    const fromIndex = scrollData.findIndex(
  //      item=> item.id === cursor)+1
  //      
  //  return scrollData.slice(fromIndex,fromIndex+5)
  console.log(scrollMap.length)
  //console.log(scrollArray.slice(scrollData,scrollData+8), cursor)
  res.send(scrollArray.slice(scrollIndex,scrollIndex+20))
//
}

export const idRoutes = [
  { //get
    method: 'get',
    route: '/top',
    handler: (req,res)=> {
      getIds(req,res,'/topstories.json')
    }
  },
  { //get
    method: 'get',
    route: '/toppest',
    handler: (req,res)=> {
      filterIds(req,res,'/topstories.json','/askstories.json','/showstories.json')
    }
  },
  { //get
    method: 'get',
    route: '/new',
    handler: (req,res)=> {
      getIds(req,res,'/newstories.json')
    }
  },
  { //get
    method: 'get',
    route: '/newest',
    handler: (req,res)=> {
      filterIds(req,res,'/newstories.json','/askstories.json','/showstories.json')
    }
  },
  { //get
    method: 'get',
    route: '/ask',
    handler: (req,res)=> {
      getIds(req,res,'/askstories.json')
    }
  },{ //get
    method: 'get',
    route: '/show',
    handler: (req,res)=> {
      getIds(req,res,'/showstories.json')
    }
  },{ //get
    method: 'get',
    route: '/job',
    handler: (req,res)=> {
      getIds(req,res,'/jobstories.json')
    }
  },
]

export const contentRoutes=[
  { //get
    method: 'get',
    route: '/top/content',
    handler: (req,res)=> {
      getContents(req,res,'/top')
    }
  },
  { //get
    method: 'get',
    route: '/toppest/content',
    handler: (req,res)=> {
      getContents(req,res,'/toppest')
    }
  },
  { //get
    method: 'get',
    route: '/new/content',
    handler: (req,res)=> {
      getContents(req,res,'/new')
    }
  },
  { //get
    method: 'get',
    route: '/newest/content',
    handler: (req,res)=> {
      getContents(req,res,'/newest')
    }
  },
  { //get
    method: 'get',
    route: '/ask/content',
    handler: (req,res)=> {
      getContents(req,res,'/ask')
    }
  },{ //get
    method: 'get',
    route: '/show/content',
    handler: (req,res)=> {
      getContents(req,res,'/show')
    }
  },{ //get
    method: 'get',
    route: '/job/content',
    handler: (req,res)=> {
      getContents(req,res,'/job')
    }
  },
  { //get
    method: 'get',
    route: '/rank',
    handler: (req,res)=> {
      getRank(req,res,'/top')
    }
  },
]

export const scrollRoutes = [
  { //get
    method: 'get',
    route: '/top/content/scroll',
    handler: ({query:{cursor = ''}},res)=> {
      getScroll(cursor,res,'/top/content')
    }
  },
  { //get
    method: 'get',
    route: '/toppest/content/scroll',
    handler: (req,res)=> ({query:{cursor = ''}},res)=> {
      getScroll(cursor,res,'/toppest/content')
    }
  },
  { //get
    method: 'get',
    route: '/new/content/scroll',
    handler: ({query:{cursor = ''}},res)=> {
      getScroll(cursor,res,'/new/content')
    }
  },
  { //get
    method: 'get',
    route: '/newest/content/scroll',
    handler: (req,res)=> ({query:{cursor = ''}},res)=> {
      getScroll(cursor,res,'/newest/content')
    }
  },
  { //get
    method: 'get',
    route: '/ask/content/scroll',
    handler: ({query:{cursor = ''}},res)=> {
      getScroll(cursor,res,'/ask/content')
    }
  },{ //get
    method: 'get',
    route: '/show/content/scroll',
    handler: ({query:{cursor = ''}},res)=> {
      getScroll(cursor,res,'/show/content')
    }
  },{ //get
    method: 'get',
    route: '/job/content/scroll',
    handler: ({query:{cursor = ''}},res)=> {
      getScroll(cursor,res,'/job/content')
    }
  }
]