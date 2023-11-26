import express  from "express";
import {verifyToken} from '../midlleware/jwt.js'
import {getGig,deleteGig,getGigs,createGig} from '../controller/gig.controller.js'
const router = express.Router();

router.get('/', verifyToken, getGigs);
router.post('/', verifyToken, createGig);
router.get('/:id',verifyToken, getGig);
router.delete('/:id', verifyToken, deleteGig);

export default router