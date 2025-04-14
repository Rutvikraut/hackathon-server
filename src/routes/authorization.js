import jwt from 'jsonwebtoken'

import result from '../utils/result.js'
import config from '../utils/config.js'

function authorization(req, res, next) {
  if (req.url == '/register' || req.url == '/login') next()
  else {
    const token = req.headers.token
    if (token) {
      try {
        const payload = jwt.verify(token, config.secret)
        req.userId = payload.userId
        next()
      } catch (e) {
        res.send(result.createErrorResult('Invalid Token'))
      }
    } else res.send(result.createErrorResult('Token is Missing'))
  }
}

export default authorization