import { Router } from 'express'
import * as AuthController from '../controllers/AuthController.js'

const router = Router()

// creating new users
router.post('/signup', AuthController.userSignUp)

// logging user in
router.post('/login', AuthController.userLogIn)

// VERIFY USER
router.post(
  '/authenticate',
  AuthController.verifyUser,
  AuthController.sendAuthUser
)

// adding product to user cart
router.post('/cart', AuthController.verifyUser, AuthController.addToCart)

// TRIAL
router.get('/verifyuser', AuthController.verifyUser)

export default router
