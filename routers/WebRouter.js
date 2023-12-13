const express = require('express')
const {User,Customer,BookSeller,Category,Books,sequelize} = require('../models/index')
const router = express.Router()
const ApiResponse = require('../utils/ApiResponse')
const errorParser = require('../utils/ErrorParser')
const jwt = require('jsonwebtoken')
const {trans_type} = require('../utils/StaticData')

//name,address,phone,email,password
router.post("/reg/customer",async(request,response)=>{
    const reqData = request.body;
    const tran = await sequelize.transaction()
    try
    {
        const {email,password} = reqData
        const userData = {email,password,type:"Customer",active_status:true,otp:0}
        const user = await User.create(userData,{transaction:tran});

        const {name,address,phone} = reqData
        const custData = {name,address,phone,email,user:user.id}
        const customer = await Customer.create(custData,{transaction:tran})
        tran.commit()
        response.status(200).json(new ApiResponse(true,"Customer Saved !",customer,null))
    }catch(err)
    {
        tran.rollback()
        response.status(500).json(new ApiResponse(false,"Customer not Saved !",null,errorParser(err)))
    }
})
//email,password,name,company_name,address,phone,reg_no,gst_no
router.post("/reg/seller", async(request,response)=>{
    const reqData = request.body;
    try
    {
      const seller = await sequelize.transaction(async (tran)=>{
        const {email,password} = reqData
        const userData = {email,password,type:"Seller",active_status:true,otp:0}
        const user = await User.create(userData,{transaction:tran});

        const {name,company_name,address,phone,reg_no,gst_no} = reqData
        const sellerData = {name,company_name,address,phone,reg_no,gst_no,email,user:user.id}
        const seller = await BookSeller.create(sellerData,{transaction:tran})
        return seller;
    })
        response.status(200).json(new ApiResponse(true,"Seller Saved !",seller,null))
    }catch(err)
    {
        response.status(500).json(new ApiResponse(false,"Seller not Saved !",null,errorParser(err)))
    }
})
//email,password
router.post("/login", async(request,response)=>{
        const reqData = request.body;
    try
    {
        const {email,password} = reqData
        // const customer = await Customer.findOne({
        //     where:{email}
        // })
        // const seller = await BookSeller.findOne({
        //     where:{email}
        // })
        // const user_name = customer.name 

        const user = await User.findOne({
            where:[{email,password}]
        })
        if(user==null)
        {
            response.status(500).json(new ApiResponse(false,"Invalid User !"))
        }
        else
        {
           const token = jwt.sign({userid:user.id,type:user.type},process.env.TOKEN_SECRET,{ expiresIn:'50m'})
           response.status(200).json(new ApiResponse(true,"Login Successfull !",{token},null)) 
        }
    }
    catch(err)
    {
        response.status(500).json(new ApiResponse(false,"Login Failed !",null,errorParser(err)))
    }
})

router.get("/list/category", async(request,response)=>{
    try
    {
        const cate_list = await Category.findAll({
            where:{status:true},
            attributes:{
                exclude:["status","createdAt","updatedAt"]
            }
        });
        response.status(200).json(new ApiResponse(true,"Categories List!",cate_list,null))
    }
    catch(err)
    {
        response.status(500).json(new ApiResponse(false,"Categories List Not Found !",null,errorParser(err)))
    }
})

router.get("/list/books",async(request,response)=>{
    try
    {
        const book_list = await Books.findAll({
            where:{status:true},
            attributes:{
                exclude:["status","createdAt","updatedAt"]
            }
        });
        response.status(200).json(new ApiResponse(true,"Books List!",book_list,null))
    }
    catch(err)
    {
        response.status(500).json(new ApiResponse(false,"Books List Not Found !",null,errorParser(err))) 
    }
})

router.get("/list/trans_type",async(request,response)=>{
    response.status(200).json(new ApiResponse(true,"Books Transaction Type",trans_type,null))
})
module.exports = router