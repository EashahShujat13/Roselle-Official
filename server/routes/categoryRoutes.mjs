import express from 'express';
import { addCategory,
    getAllCategories,
    getSingleCategory,
    deleteCategory,
    updateCategory } from '../controllers/categoryController.mjs';

const router = express.Router();

router.post('/add', addCategory);
router.get('/', getAllCategories);
router.get('/:id', getSingleCategory);
router.delete('/:id', deleteCategory);
router.put('/:id', updateCategory);

export default router;