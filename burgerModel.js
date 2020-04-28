// burgerModel.js
var mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
// Setup schema
var burgerSchema = mongoose.Schema({
    _id: Number,
    nombre: {
        type: String,
        required: true
    },
    precio: {
        type: Number,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    imagen: {
        type: String,
        required: true
    },
    ingredientes: Array
}, { _id: false });
burgerSchema.plugin(AutoIncrement, {id: 'burger_model_id_counter'});
// Export Burger model
var Burger = module.exports = mongoose.model('burger', burgerSchema);
module.exports.get = function (callback, limit) {
    Burger.find(callback).limit(limit);
}