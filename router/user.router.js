import express from 'express'
import {deleteuser} from '../controller/user.controller.js'
import { getUser } from '../controller/user.controller.js';
import { verifyToken } from '../midlleware/jwt.js';


const router = express.Router();

router.delete("/:id", verifyToken,deleteuser)
router.get("/:id", getUser);

export default router