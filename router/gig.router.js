import express  from "express";
import {verifyToken} from '../midlleware/jwt.js'
import {getGig,deleteGig,getGigs,createGig} from '../controller/gig.controller.js'
const router = express.Router();

router.get('/', verifyToken, getGigs);
router.post('/', verifyToken, createGig);
router.get('/:id', getGig);
router.delete('/:id', deleteGig);

export default router