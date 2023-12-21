const express = require('express');
const multer = require('multer');

const db = require('../data/database');

const router = express.Router();



const storageConfig =multer.diskStorage({
  destination:function(req,file,cb){
    cb(null,'image');
  },
  filename:function(req,file, cb){
    cb(null, Date.now() + '-' + file.originalname)
  }
})

const upload = multer({storage:storageConfig});

router.get('/', async function(req, res) {
  const profile = await db.getDb().collection('users').find({}).toArray();
  console.log(profile);
  res.render('profiles',{profiles:profile});

});

router.get('/new-user', function(req, res) {
  res.render('new-user');
});
router.post('/profiles',upload.single('image'),async function(req, res){
  const uploadedFile = req.file;
   const userData = req.body;

  await db.getDb().collection('users').insertOne({
    name:userData.username,
    imagePath:uploadedFile.path
  })

   res.redirect('/');
})
module.exports = router;