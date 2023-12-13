const router = require('express').Router()
const ApiResponse = require('../utils/ApiResponse')
const errorParser = require('../utils/ErrorParser')
const {Category} = require('../models/index')

router.use((request,response,next)=>{
    if(request.user.type=='Admin')
    {
        next()
    }
    else
    {
        response.status(500).json(new ApiResponse(false,"Unauthorized Access !",null,"Only Admin allowed !"))
    }
})

router.post("/",async(request,response)=>{
    const reqData = request.body; 
    try{
        const {cate_name,desc} = reqData
        const cateData = {cate_name,desc,status:true}
        const cate = await Category.create(cateData);  
        response.status(200).json(new ApiResponse(true,"Category Saved !",cate,null))
    }
    catch(err)
    {
        response.status(500).json(new ApiResponse(false,"Category not Saved !",null,errorParser(err)))
    }
         
})
router.put("/:id",async(request,response)=>{
    const reqData = request.body; 
    const id = request.params.id
    const {cate_name,desc} = reqData
    try{
        const cate = await Category.update({cate_name,desc},{where:{id}})
        if(cate[0]>0)
        {
            response.status(200).json(new ApiResponse(true,"Category Updated !",cate,null))
        }
        else
        {
            response.status(500).json(new ApiResponse(false,"Category not found !",null,null))
        }
    }
    catch(err)
    {
        response.status(500).json(new ApiResponse(false,"Category not updated !",null,errorParser(err)))
    }
})
router.patch("/:id",async(request,response)=>{
    const id = request.params.id
    try{
        var cate = await Category.findOne({where:{id}})
        if(cate==null )
        {
            response.status(500).json(new ApiResponse(false,"Category not found !",null,null))
        }
        else
        {
            cate.status = !cate.status
            cate.save()
            response.status(200).json(new ApiResponse(true,"Category Status Changed !",null,null))
        }
    }
    catch(err)
    {
        response.status(500).json(new ApiResponse(false,"Category Status Unchanged !",null,errorParser(err)))
    }
})

module.exports = router