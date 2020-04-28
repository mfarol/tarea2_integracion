// ingredientController.js
// Import ingredient model
Ingredient = require('./ingredientModel');
// Handle index actions

exports.index = function (req, res) {
    Ingredient.get(function (err, ingredients) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        var ingredientes = new Array();
        for (var key in ingredients) {
            var dicc = {
                id: ingredients[key]["_id"],
                nombre: ingredients[key]["nombre"],
                descripcion: ingredients[key]["descripcion"],
            }
            ingredientes.push(dicc);
        }
        res.json({
            ingredientes
        });
    });
};
// Handle create ingredients actions
exports.new = function (req, res) {
    var ingredient = new Ingredient();
    ingredient.nombre = req.body.nombre ? req.body.nombre : ingredient.nombre;
    ingredient.descripcion = req.body.descripcion;
// save the ingredient and check for errors
    ingredient.save(function (err) {
        if (err)
            res.json(err);
        res.json({
            id: ingredient._id,
            nombre: ingredient.nombre,
            descripcion: ingredient.descripcion
        });
    });
};
// Handle view ingredient info
exports.view = function (req, res) {
    Ingredient.findById(req.params.ingredient_id, function (err, ingredient) {
        if (err)
            res.send(err);
        res.json({
            id: ingredient._id,
            nombre: ingredient.nombre,
            descripcion: ingredient.descripcion
        });
    });
};
// Handle update ingredient info
exports.update = function (req, res) {
    Ingredient.findById(req.params.ingredient_id, function (err, ingredient) {
        if (err)
            res.send(err);
            ingredient.nombre = req.body.nombre ? req.body.nombre : ingredient.nombre;
            ingredient.descripcion = req.body.descripcion;
// save the ingredient and check for errors
        ingredient.save(function (err) {
            if (err)
                res.json(err);
            res.json({
                message: 'Ingredient Info updated',
                data: ingredient
            });
        });
    });
};
// Handle delete ingredient
exports.delete = function (req, res) {
    Ingredient.remove({
        _id: req.params.ingredient_id
    }, function (err, ingredient) {
        if (err)
            res.send(err);
res.json({
            status: "success",
            message: 'Ingredient deleted'
        });
    });
};