const express = require('express');

const blogControllers = require('../controllers/blog-controllers');
const guadRoutes = require('../middlewares/auth-protect-middlewares');

const router = express.Router();


router.get('/', blogControllers.gethome);

router.get('/401',blogControllers.get401);

router.use(guadRoutes);

router.get('/admin', blogControllers.getAdmin);

router.post('/posts',blogControllers.createPost);

router.get('/posts/:id/edit',blogControllers.getSinglePost);

router.post('/posts/:id/edit',blogControllers.editPost );

router.post('/posts/:id/delete',blogControllers.deletePost );

module.exports = router;
