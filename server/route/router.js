const express =require("express");
 const router=express.Router();
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");
 const user=require("../models/user.js");
 const secretcode="mynameisabhishekshuklafrommnnitallahabad";
 router.post('/createuser',async(req,res)=>{
    const salt=await bcrypt.genSalt(10);
    let secpassword=await bcrypt.hash(req.body.password,salt);
try {
   await user.create({
        name:req.body.name,
        email:req.body.email,
        password:secpassword,

    }).then(res.json({success:true}));

} catch (error) {
    console.log(error);
}
 })
 router.post("/loginuser",async(req,res)=>{
    let email=req.body.email;
    try {
     let useremail=  await user.findOne({email});
     if(!useremail){
        return res.status(400).json({errors:"Try Login With Credentials"})
     }
     const compare=await bcrypt.compare(req.body.password,useremail.password)
     if(!compare){
        return res.status(400).json({errors:"Try Login With Credentials"})
     }
     const data={
        user:{
            id:useremail.id
        }
     }


     const token=jwt.sign(data,secretcode);
     return res.json({success:true,token:token})
    
    } catch (error) {
        
        res.status(400).json({errors:"last"})
    }
}
 )
 module.exports=router;