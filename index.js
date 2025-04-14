import express from 'express'
import cors from 'cors'
import userRouter from './src/routes/userRoutes.js'

const app = express()

app.use(express.json())
app.use(cors())
app.use('/',userRouter)

app.listen(4000, 'localhost', () => {
    console.log('server started at port 4000')
})