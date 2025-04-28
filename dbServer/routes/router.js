const express=require('express')

const router=new express.Router()
const userController=require('../controller/userController')
const multerMiddleware=require('../middleware/multerMiddleware')
const flightController=require('../controller/FlightController')
const jwt=require('../middleware/jwtMiddleware')
router.post('/register',multerMiddleware.single('image'),userController.registerController)
router.post('/login',userController.loginController)

router.post('/flightadd',jwt,multerMiddleware.single('destinationImg'),flightController.flightAddController)
router.get('/allFlights',flightController.flightView)

router.put('/flight/:id/edit',jwt,multerMiddleware.single('destinationImg'),flightController.flightEdit)


router.delete('/flight/:id/delete',jwt,flightController.deleteFlight)
router.post('/adminstaffadd',userController.adminStaffAdd)

module.exports=router