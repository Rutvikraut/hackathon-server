import express from 'express'

import result from '../utils/result.js'
import pool from '../db/configDb.js'

const router = express.Router()


router.get('/getCategory', (request, response) => {
    const sql = `
          SELECT categoryId, title, description
          FROM categories 
      `
    pool.query(sql, (error, tasks) => {
      response.send(result.createResult(error, tasks))
    })
  })


router.post('/addCategory',(req,res)=>{
    const { title, description } = req.body
    const sql = `INSERT INTO categories(title,description) VALUES(?,?)`
    pool.query(sql, [title,description ], (error, data) => {
        res.send(result.createResult(error, data))
    })
})

export default router


