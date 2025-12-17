const express = require('express');
const { 
    getAllProducts, 
    getProductsByCategory,
    createProduct, 
    createManyProducts,
    updateProduct, 
    deleteProduct 
} = require('../controllers/productController');
const router = express.Router();

router.get('/products', getAllProducts);
router.get('/products/category/:category', getProductsByCategory);
router.post('/products', createProduct);
router.post('/products/bulk', createManyProducts);
router.put('/products/:id', updateProduct);
router.delete('/products/:id', deleteProduct);

module.exports = router;