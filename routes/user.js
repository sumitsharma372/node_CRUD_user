const express = require('express')
const router = express.Router()
const { body } = require('express-validator')
const { getUser, signupUser, loginUser, updateUser, deleteUser} = require('./../controllers/userController')
const auth = require('../middleware/auth')


router.post('/signupuser', [
    body('name').isLength({ min: 4 }),
    body('email').isEmail(),
    body('phone').isLength({ min: 3 }),
    body('password').isLength({ min: 2 }),
], signupUser)

router.post('/loginuser', [
    body('email', 'Enter a Valid Email').isEmail(),
    body('password', 'Password cannot be blank').isLength({ min: 2 }),
] , loginUser)

router.get('/getuser', auth , getUser)

router.patch('/updateuser', auth, [
    body('name').isLength({ min: 4 }),
    body('email').isEmail(),
    body('phone').isLength({ min: 3 }),
    body('password').isLength({ min: 2 }),
], updateUser)

router.delete('/deleteuser', auth,  deleteUser)

router.get('/', (req, res) => {
    res.status(200).send('<h1>User Auth API</h1><br/><br/><p><strong>Visit the end points to use this API.</strong></p>')
})


module.exports = router