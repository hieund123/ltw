import express from 'express';
import { createComment, createPhoto, getAllPhotos, getPhotoById, getPhotosByUserId } from "../controllers/photos.js";

const router = express.Router();

router.get('/all', getAllPhotos);
router.get('/:id', getPhotosByUserId);
router.get('/info/:id', getPhotoById);
router.post('/create', createPhoto)
router.post('/createcmt', createComment)


export default router;
