import express from 'express'
import CryptoJS from 'crypto-js'
import result from '../utils/result.js'
import pool from '../db/configDb.js'
import jwt from 'jsonwebtoken'
import config from '../utils/config.js'
const router = express.Router()

router.post('/register',(req,res)=>{
    const { fullName,email,phone, password } = req.body
    const encryptedPassword = String(CryptoJS.SHA256(password))
    const sql = `INSERT INTO user(email, password,full_name, phone_no) VALUES(?,?,?,?)`
    pool.query(sql, [ email, encryptedPassword,fullName, phone], (error, data) => {
        res.send(result.createResult(error, data))
    })
})

router.post('/login', (req, res) => {
    const { email, password } = req.body
    const encryptedPassword = String(CryptoJS.SHA256(password))
    const sql = `SELECT * FROM user WHERE email = ? AND password = ?`
    pool.query(sql, [email, encryptedPassword], (error, data) => {
        if (data) {
            if (data.length != 0) {
                const payload = {
                    userId: data[0].userId
                }
                console.log(payload)
                const token = jwt.sign(payload, config.secret)
                const body = {
                    token: token,
                    //name: `${data[0].firstName} ${data[0].lastName}`
                    name: `${data[0].full_name}`
                }
                res.send(result.createSuccessResult(body))
            }
            else
                res.send(result.createErrorResult("Invalid email or password"))
        }
        else
            res.send(result.createErrorResult(error))
    })
})

export default router


