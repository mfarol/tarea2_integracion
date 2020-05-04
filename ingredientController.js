// ingredientController.js
// Import ingredient model
Ingredient = require('./ingredientModel');
Burger = require('./burgerModel');
Ingbur = require('./ingburModel');
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
        res.status(200).json(
            ingredientes
        );
    });
};
// Handle create ingredients actions
exports.new = function (req, res) {
    var ingredient = new Ingredient();
    ingredient.nombre = req.body.nombre ? req.body.nombre : ingredient.nombre;
    ingredient.descripcion = req.body.descripcion;
// save the ingredient and check for errors
    ingredient.save(function (err) {
        if (err) {
            res.status(400).send("input invalido");
        }
        else {
            res.status(201).json({
                id: ingredient._id,
                nombre: ingredient.nombre,
                descripcion: ingredient.descripcion
            });
        }
    });
};
// Handle view ingredient info
exports.view = function (req, res) {
    var numero = Number(req.params.ingredient_id);
    if (Number.isNaN(numero)) {
        res.status(400).send("id invalido");
    }
    else {
        Ingredient.findById(req.params.ingredient_id, function (err, ingredient) {
            if (ingredient == null) {
                res.status(404).send("ingrediente inexistente");
            }
            else {
                res.status(200).json({
                    id: ingredient._id,
                    nombre: ingredient.nombre,
                    descripcion: ingredient.descripcion
                });
            }
        });
    }
};
// Handle update ingredient info
exports.update = function (req, res) {
    Ingredient.findById(req.params.ingredient_id, function (err, ingredient) {
        if (ingredient == null) {
            res.status(404).send("Ingrediente inexistente");
        }
        else {
            ingredient.nombre = req.body.nombre ? req.body.nombre : ingredient.nombre;
            ingredient.descripcion = req.body.descripcion;
            // save the ingredient and check for errors
            ingredient.save(function (err) {
                if (err) {
                    res.status(400).send("Parámetros inválidos");
                }
                else {
                    res.status(200).json({
                        id: ingredient._id,
                        nombre: ingredient.nombre,
                        descripcion: ingredient.descripcion
                    });
                }
            });
        }
    });
};
// Handle delete ingredient
exports.delete = function (req, res) {
    Ingbur.get(function (err, ingburs) {
        var verd = 0;
        for (var key in ingburs) {
            if (ingburs[key].ingredient == req.params.ingredient_id) {
                verd = 1;
            }
        }
        if (verd == 0) {
            Ingredient.findById(req.params.ingredient_id, function (err, ingredient) {
                if (ingredient == null) {
                    res.status(404).send("ingrediente inexistente");
                }
                else {
                    Ingredient.remove({
                        _id: req.params.ingredient_id
                    }, function (err, ingredient) {
                        if (err) {
                            res.status(404).send("ingrediente inexistente");
                        }
                        else {
                            res.status(200).send("ingrediente eliminado");
                        }
                    });
                }
            });
        }
        else {
            res.status(409).send("Ingrediente no se puede borrar, se encuentra presente en una hamburguesa");
        }
    });
};