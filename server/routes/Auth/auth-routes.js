const express = require('express')
const router = express.Router();
const {registerUser, LoginUser,logoutUser,authMiddleware} = require('../../Controllers/Auth/authController')

router.post('/register', registerUser)
router.post('/login', LoginUser)
router.post('/logout', logoutUser)

router.get('/check-auth', authMiddleware, (req ,res)=>{
  const user = req.user;
  res.status(200).json({
    success:true,
    message: 'authenticated user!',
    user
  })
})

module.exports = router;