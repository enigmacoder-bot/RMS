const express = require('express');
const categoryController = require('../controllers/categoryController');
const router = express.Router();

router.post('/', categoryController.createCategory);
router.get('/', categoryController.getCategories);
router.delete('/:cid', categoryController.deleteCategory);

module.exports = router;
