import express from 'express'
import {deleteuser} from '../controller/user.controller.js'


const router = express.Router();

router.get("/",deleteuser)
// router.get('/register',register)

export default router