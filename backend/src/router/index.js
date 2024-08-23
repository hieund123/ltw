import express from 'express';
import routerAuth from './auth.js';
import routerPhoto from './PhotoRouter.js';

const router = express.Router();

router.use('/auth', routerAuth);
router.use('/photos', routerPhoto);

export default router;
