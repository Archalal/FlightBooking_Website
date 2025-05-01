const express=require('express')

const router=new express.Router()
const userController=require('../controller/userController')
const multerMiddleware=require('../middleware/multerMiddleware')
const flightController=require('../controller/FlightController')
const bookingControler=require('../controller/bookedFlightController')

const jwt=require('../middleware/jwtMiddleware')
router.post('/register',multerMiddleware.single('image'),userController.registerController)
router.post('/login',userController.loginController)

router.post('/flightadd',jwt,multerMiddleware.single('destinationImg'),flightController.flightAddController)
router.get('/allFlights',flightController.flightView)

router.put('/flight/:id/edit',jwt,multerMiddleware.single('destinationImg'),flightController.flightEdit)


router.delete('/flight/:id/delete',jwt,flightController.deleteFlight)
router.post('/adminstaffadd',userController.adminStaffAdd)

router.get('/getalluser',userController.getUserController)

router.get(`/:id/getSingleUser`,userController.getSingleUser)


router.get("/getallflights",flightController.getFlights)

router.get("/searchFlight",flightController.flightSearch)


router.get('/getsingleflight/:id',flightController.getSingleFlight)

router.post('/bookedflights/:id',jwt,bookingControler.addBooking)

module.exports=router