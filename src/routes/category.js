import express from 'express'

import result from '../utils/result.js'
import pool from '../db/configDb.js'

const router = express.Router()


router.get('/getCategories', (request, response) => {
    const sql = `
          SELECT categoryId, title, description
          FROM categories 
      `
    pool.query(sql, (error, tasks) => {
      response.send(result.createResult(error, tasks))
    })
  })

  router.post('/getCategoryByName', (request, response) => {
    const {categoryName} = request.body
    console.log(categoryName)
    const sql = `
          SELECT categoryId
          FROM categories where title = ?
      `
    pool.query(sql,[categoryName], (error, data) => {
      console.log(data)
      response.send(result.createResult(error, data))
    })
  })

router.post('/addCategory',(req,res)=>{
    const { title } = req.body
    const sql = `INSERT INTO categories(title) VALUES(?)`
    pool.query(sql, [title], (error, data) => {
        res.send(result.createResult(error, data))
    })
})

router.delete('/deleteCategory/:id',(req,res)=>{
  const { id } = req.params
  const sql = `DELETE categories, blogs
FROM categories
JOIN blogs ON categories.categoryId = blogs.categoryId
WHERE categories.categoryId = ?;`
  pool.query(sql, [id], (error, data) => {
      res.send(result.createResult(error, data))
  })
})

export default router


