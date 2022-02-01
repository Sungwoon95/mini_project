import express from 'express';
import cors from 'cors';
import { storyRoute } from './routes/contents.js';
import {idRoutes, contentRoutes, scrollRoutes} from './routes/ids.js'
import {userRoutes} from './routes/users.js'
import {articleRoutes,commentRoutes} from './routes/article.js'
import axios from 'axios'

const app = express()

app.use(express.urlencoded({extended:true}));
app.use(express.json())

app.use(cors({
  origin: 'http://localhost:3000',
  credentials:true
}))

const routes = [...idRoutes, ...contentRoutes,...storyRoute, ...scrollRoutes, ...userRoutes, ...articleRoutes,...commentRoutes]
routes.forEach(({method, route, handler})=>{
  app[method](route,handler)
})


app.listen(8000, ()=> {
  console.log('sever')
})