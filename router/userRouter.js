const express = require('express');
const router = express.Router()
const usercontroller = require("../controller/usercontroller")
const {verifyToken} = require("../utils/userverification")
const {signupValidation , loginValidation} = require("../utils/userValidation")

router.post('/user-signup',[signupValidation],usercontroller.signup)
router.post('/user-login',[loginValidation],usercontroller.login)
router.post('/create-task',verifyToken, usercontroller.create_task)
router.put('/update-task',verifyToken,usercontroller.update_task)
router.get('/fetch-task', usercontroller.fetch_task)
router.delete('/delete-task', verifyToken, usercontroller.delete_task)






module.exports = router;