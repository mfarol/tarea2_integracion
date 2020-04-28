// burgerController.js
// Import burger model
Burger = require('./burgerModel');
// Handle index actions

exports.index = function (req, res) {
    Burger.get(function (err, burgers) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        var hamburguesas = new Array();
        for (var key in burgers) {
            var dicc = {
                id: burgers[key]["_id"],
                nombre: burgers[key]["nombre"],
                precio: burgers[key]["precio"],
                descripcion: burgers[key]["descripcion"],
                imagen: burgers[key]["imagen"],
                ingredientes: burgers[key]["ingredientes"]
            }
            hamburguesas.push(dicc);
        }
        res.json({
            hamburguesas
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
            imagen: burger.imagen
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
            imagen: burger.imagen,
            ingredientes: burger.ingredientes
        });
    });
};
// Handle update burger info
exports.update = function (req, res) {
    Burger.findById(req.params.burger_id, function (err, burger) {
        if (err)
            res.send(err);
            burger.nombre = req.body.nombre ? req.body.nombre : burger.nombre;
            burger.precio = req.body.precio;
            burger.descripcion = req.body.descripcion;
            burger.imagen = req.body.imagen;
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
    });
};
// Handle delete burger
exports.delete = function (req, res) {
    Burger.remove({
        _id: req.params.burger_id
    }, function (err, burger) {
        if (err)
            res.send(err);
res.json({
            status: "success",
            message: 'Burger deleted'
        });
    });
};