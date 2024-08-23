import express from 'express';
import { getUser, logOut, signUp, signIn } from "../controllers/auth.js"; 

const router = express.Router();

router.get('/signup', signUp);
router.get('/getUser/:id', getUser);
router.post('/signin', signIn);
router.post('/logout', logOut);

export default router;
