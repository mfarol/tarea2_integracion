var mongoose = require('mongoose');
// Setup schema
var ingburSchema = mongoose.Schema({
    burger: {
        type: Number,
        required: true
    },
    ingredient: {
        type: Number,
        required: true
    }
});
// Export Ingredient model
var Ingbur = module.exports = mongoose.model('ingbur', ingburSchema);
module.exports.get = function (callback, limit) {
    Ingbur.find(callback).limit(limit);
}