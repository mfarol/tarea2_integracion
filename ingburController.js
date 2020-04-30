// ingburController.js
// Import burger model
Burger = require('./burgerModel');
Ingredient = require('./ingredientModel');
Ingbur = require('./ingburModel');
// Handle index actions

exports.index = function (req, res) {
    Ingbur.get(function (err, burgers) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        res.json({
            burgers
        });
    });
};
// Handle create burger actions
exports.new = function (req, res) {
    var burger = new Burger();
    burger.nombre = req.body.nombre ? req.body.nombre : burger.nombre;
    burger.precio = req.body.precio;
    burger.descripcion = req.body.descripcion;
    burger.imagen = req.body.imagen;
    burger.ingredientes = new Array();
// save the burger and check for errors
    burger.save(function (err) {
        if (err)
            res.json(err);
        res.json({
            id: burger._id,
            nombre: burger.nombre,
            precio: burger.precio,
            descripcion: burger.descripcion,
            imagen: burger.imagen,
            ingredientes: burger.ingredientes
        });
    });
};
// Handle view burger info
exports.view = function (req, res) {
    Burger.findById(req.params.burger_id, function (err, burger) {
        if (err)
            res.send(err);
        res.json({
            id: burger._id,
            nombre: burger.nombre,
            precio: burger.precio,
            descripcion: burger.descripcion,
            imagen: burger.imagen
        });
    });
};
// Handle update burger info
exports.update = function (req, res) {
    Burger.findById(req.params.burger_id, function (err, burger) {
        if (burger == null) {
            res.status(400).send("Id de hamburguesa inválido");
        }
        else {
            Ingredient.findById(req.params.ingredient_id, function (err, ingredient) {
                if (ingredient == null) {
                    res.status(404).send("Ingrediente inexistente");
                }
                else {
                    Ingbur.get(function (err, ingburs) {
                        var verd = 0;
                        for (var key in ingburs) {
                            if (ingburs[key].burger == burger._id) {
                                if (ingburs[key].ingredient == ingredient._id) {
                                    verd = 1;
                                }
                            }
                        }
                        if (verd == 0) {
                            var ingbur = new Ingbur();
                            ingbur.burger = req.params.burger_id;
                            ingbur.ingredient = req.params.ingredient_id;
                            ingbur.save();
                            burger.ingredientes.push({path: 'https://aqueous-fortress-96382.herokuapp.com/api/ingrediente/' + ingredient._id.toString()});
                            burger.save();
                            res.status(201).send("Ingrediente agregado");
                        }
                        else {
                            res.status(201).send("Ingrediente agregado");
                        }
                    });
                }
            });
        }
    });
};
// Handle delete burger
exports.delete = function (req, res) {
    Burger.findById(req.params.burger_id, function (err, burger) {
        if (burger == null) {
            res.status(400).send("Id de hamburguesa inválido");
        }
        else {
            Ingredient.findById(req.params.ingredient_id, function (err, ingredient) {
                if (ingredient == null) {
                    res.status(404).send("Ingrediente inexistente");
                }
                else {
                    var largo_ingrediente = ingredient._id.toString().length;
                    var verd = 0;
                    Ingbur.get(function(err, ingburs) {
                        for (var key in ingburs) {
                            if (ingburs[key].burger == burger._id) {
                                if (ingburs[key].ingredient == ingredient._id) {
                                    verd = 1;
                                    var tupla = ingburs[key];
                                }
                            }
                        }
                        if (verd == 1) {
                            for (var key in burger.ingredientes) {
                                if (burger.ingredientes[key]["path"].slice(-largo_ingrediente) === ingredient._id.toString()) {
                                    burger.ingredientes.splice(key, 1);
                                }
                            }
                            burger.save();
                            Ingbur.remove({
                                _id: tupla._id
                            }, function (err, ingbur) {
                                console.log("ingbur retirado");
                            });
                            res.status(200).send("ingrediente retirado");
                        }
                        else {
                            res.status(404).send("Ingrediente inexistente en la hamburguesa")
                        }
                    });
                }
            });
        }
    });
};