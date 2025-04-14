import express from 'express'

import result from '../utils/result.js'
import pool from '../db/configDb.js'

const router = express.Router()


router.get('/getCategory', (request, response) => {
    const sql = `
          SELECT categoryId, title, description
          FROM categories 
      `
    pool.query(sql, [request.userId], (error, tasks) => {
      response.send(result.createResult(error, tasks))
    })
  })


router.post('/addblog',(req,res)=>{
    const { title, content, category_id} = req.body
    const sql = `INSERT INTO blogs(title,contents,categoryId,userId) VALUES(?,?,?,?) `
    pool.query(sql, [title,content,category_id,req.userId], (error, data) => {
        res.send(result.createResult(error, data))
    })
})

export default router


