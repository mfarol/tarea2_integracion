// api-routes.js
// Initialize express router
let router = require('express').Router();
// Set default API response
router.get('/', function (req, res) {
    res.json({
        status: 'API Its Working',
        message: 'Welcome to Restaurant crafted with love!',
    });
});
// Import contact controller
var burgerController = require('./burgerController');
var ingredientController = require('./ingredientController');
var ingburController = require('./ingburController');
// Contact routes
router.route('/hamburguesa')
    .get(burgerController.index)
    .post(burgerController.new);
router.route('/hamburguesa/:burger_id')
    .get(burgerController.view)
    .patch(burgerController.update)
    .put(burgerController.update)
    .delete(burgerController.delete);
router.route('/ingrediente')
    .get(ingredientController.index)
    .post(ingredientController.new);
router.route('/ingrediente/:ingredient_id')
    .get(ingredientController.view)
    .patch(ingredientController.update)
    .put(ingredientController.update)
    .delete(ingredientController.delete);
router.route('/hamburguesa/:burger_id/ingrediente/:ingredient_id')
    .put(ingburController.update)
    .delete(ingburController.delete);
// Export API routes
module.exports = router;