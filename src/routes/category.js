import express from 'express'

import result from '../utils/result.js'
import pool from '../db/configDb.js'

const router = express.Router()


router.get('/', (request, response) => {
    const sql = `
          SELECT categoryId, title, description
          FROM categories
          WHERE categoryId = ? 
      `
    db.query(sql, [request.userId], (error, tasks) => {
      response.send(result.createResult(error, tasks))
    })
  })


router.post('/add',(req,res)=>{
    const { title,description } = req.body
    const sql = `INSERT INTO categories(title,description) VALUES(?,?)`
    pool.query(sql, [title,description ], (error, data) => {
        res.send(result.createResult(error, data))
    })
})

export default router


