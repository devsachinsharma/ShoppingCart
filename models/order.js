const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    user: {type: Schema.Types.ObjectId, ref: 'User'},    // store an id but behind the scenes this id links to User collection
    cart: {type: Object, required: true},
    address : {type: String, required:true},
    ame: {type:String, required:true},
    paymentId: {type:String, required:true}
});

module.exports = mongoose.model('Order', schema);