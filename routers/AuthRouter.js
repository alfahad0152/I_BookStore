const router = require('express').Router()
const ApiResponse = require('../utils/ApiResponse')
const jwt = require('jsonwebtoken')
const cateRouter = require('./CateRouter')
const bookRouter = require('./BookRouter')

router.use((request,response,next)=>{
    const authHeader = request.headers.authorization
    const token = authHeader && authHeader.split(' ')[1]
    if(token==undefined || token==null || token.length==0)
    {
        response.status(500).json(new ApiResponse(false,"Token Not Found !",null,"Token Not Attached"))
    }
    else
    {
        jwt.verify(token,process.env.TOKEN_SECRET,(err,tokendata)=>{
            if(err)
            {
                response.status(500).json(new ApiResponse(false,"Invalid or Expire Token!",null,"Wrong Token Attached !"))
            }
            else
            {
                const{userid,type} = tokendata
                request.user = {userid,type} 
                next()
            }
        })
    }
})
router.use("/cate",cateRouter)
router.use("/book",bookRouter)

module.exports = router