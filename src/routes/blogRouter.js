import express from 'express'

import result from '../utils/result.js'
import pool from '../db/configDb.js'

const router = express.Router()


router.get('/getblogs', (request, response) => {
    const sql = `
        SELECT b.blogId AS Id,
        b.title AS Title,
        c.title AS Category,
        DATE_FORMAT(b.createdTimestamp, '%d-%m-%Y %r') AS Date,
        u.full_name AS Author
        FROM blogs b LEFT JOIN 
        user u ON b.userId = u.userId
        LEFT JOIN categories c ON b.categoryId = c.categoryId
        ORDER BY b.createdTimestamp;

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

router.get('/getMyBlogs', (request, response) => {
    const sql = `
        SELECT b.blogId AS Id,
        b.title AS Title,
        c.title AS Category,
        DATE_FORMAT(b.createdTimestamp, '%d-%m-%Y %r') AS Date,
        u.full_name AS Author
        FROM blogs b LEFT JOIN 
        user u ON b.userId = u.userId
        LEFT JOIN categories c ON b.categoryId = c.categoryId
        where b.userId = ?
        ORDER BY b.createdTimestamp;

      `
    pool.query(sql, [request.userId], (error, tasks) => {
      response.send(result.createResult(error, tasks))
    })
})

router.post('/getBlogsByTitle', (request, response) => {
    const {title} = request.body
    const sql = `
        SELECT b.blogId AS Id,
        b.title AS Title,
        b.contents AS Content,
        c.title AS Category,
        DATE_FORMAT(b.createdTimestamp, '%d-%m-%Y %r') AS Date,
        u.full_name AS Author
        FROM blogs b LEFT JOIN 
        user u ON b.userId = u.userId
        LEFT JOIN categories c ON b.categoryId = c.categoryId
        where b.title = ?
        ORDER BY b.createdTimestamp;

      `
    pool.query(sql, [title], (error, tasks) => {
      response.send(result.createResult(error, tasks))
    })
})

router.delete('/deleteBlog/:id',(req,res)=>{
    const { id } = req.params
    const sql = `DELETE FROM blogs WHERE blogId = ?`
    pool.query(sql, [id], (error, data) => {
        res.send(result.createResult(error, data))
    })
})

export default router


