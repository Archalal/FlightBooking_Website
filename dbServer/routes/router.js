const express=require('express')

const router=new express.Router()
const userController=require('../controller/userController')
const multerMiddleware=require('../middleware/multerMiddleware')

router.post('/register',multerMiddleware.single('image'),userController.registerController)
router.post('/login',userController.loginController)

module.exports=router