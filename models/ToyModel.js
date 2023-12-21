var mongoose = require('mongoose');
var toySchema = mongoose.Schema({
   model: String,
   color: String,
   image: String,
   brand: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'brands'  // 'brands': collection
   }
});
//Relationship : toys (many) - brands (one)

var toyModel = mongoose.model('toys', toySchema); // 'toys' : collection
module.exports = toyModel;