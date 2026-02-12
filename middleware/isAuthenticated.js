const jwt = require("jsonwebtoken")
const { promisify } = require("util")
const db = require("../model/index")
const users = db.users

exports.isAuthenticated = async(req,res,next) =>{
   const token = req.cookies.token
   if(!token || token == null || token == undefined){
   return res.status(401).json({
    message : "Please provide token or login"
   })
   }
   // yedi token aayovane
  const verifiedResult = await promisify(jwt.verify) (token, "thisissecret")
  const user = await users.findByPk(verifiedResult.id)
  if(!user){
    return res.status(404).json({
        message : "User doesnt exist"
    })
  }
  req.userId = verifiedResult.id
  req.currentOrganizationNumber = user.currentOrganizationNumber
  next()

}