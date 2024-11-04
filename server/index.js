import express from 'express'
import 'dotenv/config'
import cors from 'cors'
import connectDB from './db/connectDB.js'
import router from './routes/route.js'

const app = express()
app.use(cors())
app.use(express.json())
app.use('/',router)

const port = 4000
app.listen(port, () => console.log(`Server is running on Port: ${port}`))
connectDB(process.env.MONGO_DB_URI)