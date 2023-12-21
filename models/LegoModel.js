var mongoose = require('mongoose');
var legoSchema = mongoose.Schema({
   model: String,
   color: String,
   image: String,
   material: String,
   brand: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'brands'  // 'brands': collection
   }
});
//Relationship : legos (many) - brands (one)

var legoModel = mongoose.model('legos', legoSchema); // 'legos' : collection
module.exports = legoModel;