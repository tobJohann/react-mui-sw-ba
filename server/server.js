import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import dotenv from 'dotenv'
import * as database from './config/database'
import apiRoutes from './src/routes/api.routes'

dotenv.config()
const server = express()
server.use(bodyParser.json())
server.use(cors())

database.connect()

const port = process.env.PORT || 4000

/*API-Routes*/
server.use('/api', apiRoutes)

server.listen(port, () => {
  console.log(`Server listening on Port : ${port}`)
})