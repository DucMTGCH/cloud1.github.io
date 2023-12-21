var express = require('express');
var router = express.Router();
var LegoModel = require('../models/LegoModel');
var BrandModel = require('../models/BrandModel');


router.get('/', async (req, res) => {
   var legos = await LegoModel.find({}).populate('brand');
  
   res.render('lego/index', { legos });
})

router.get('/customer', async (req, res) => {
   var legos = await LegoModel.find({}).populate('brand');
   
   res.render('lego/list', { legos });
})

router.get('/add', async (req, res) => {
   var brands = await BrandModel.find({});
   res.render('lego/add', { brands });
})

router.post('/add', async (req, res) => {
   var lego = req.body;
   await LegoModel.create(lego);
   res.redirect('/lego');
})


router.get('/delete/:id', async (req, res) => {
   await LegoModel.findByIdAndDelete(req.params.id);
   res.redirect('/lego');
})

router.get('/edit/:id', async (req, res) => {
   var id = req.params.id;
   var lego = await LegoModel.findById(id);
   var brands = await BrandModel.find({});
   res.render('lego/edit', { lego, brands });
})

router.post('/edit/:id', async (req, res) => {
   var id = req.params.id;
   var lego = req.body;
   try {
      await LegoModel.findByIdAndUpdate(id, lego);
      console.log('update succeed !');
   } catch (err) {
      console.log('update failed. Error: ' + err);
   }
   res.redirect('/lego');
})

router.get('/sort/asc', async (req, res) => {
   //SQL: SELECT * FROM legos ORDER BY model
   var legos = await LegoModel.find().populate('brand').sort({ model: 1 });
   res.render('lego/index', { legos })
})

router.get('/sort/desc', async (req, res) => {
   //SQL: SELECT * FROM legos ORDER BY model DESC
   var legos = await LegoModel.find().populate('brand').sort({ model: -1 });
   res.render('lego/index', { legos })
})

router.post('/search', async (req, res) => {
   var keyword = req.body.keyword;
   //SQL: SELECT * FROM legos WHERE model LIKE '%keyword%'
   var legos = await LegoModel.find({ model: new RegExp(keyword, "i") }).populate('brand');
   res.render('lego/index', { legos })
})

module.exports = router;