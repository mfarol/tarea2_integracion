// burgerModel.js
var mongoose = require('mongoose');
const AutoIncrement2 = require('mongoose-sequence')(mongoose);
// Setup schema
var ingredientSchema = mongoose.Schema({
    _id: Number,
    nombre: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    }
}, { _id: false });
ingredientSchema.plugin(AutoIncrement2, {id: 'ingredient_model_id_counter'});
// Export Ingredient model
var Ingredient = module.exports = mongoose.model('ingredient', ingredientSchema);
module.exports.get = function (callback, limit) {
    Ingredient.find(callback).limit(limit);
}