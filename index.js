import express from 'express'
import cors from 'cors'
import userRouter from './src/routes/userRoutes.js'
import categoryRouter from './src/routes/category.js'
import authorization from './src/routes/authorization.js'


const app = express()

app.use(express.json())
app.use(cors())
app.use(authorization)

app.use('/',userRouter)
app.use('/',categoryRouter)

app.listen(4000, 'localhost', () => {
    console.log('server started at port 4000')
})