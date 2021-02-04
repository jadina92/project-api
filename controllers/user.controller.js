const model = require('../models/user.model')();

var usersController = function () { }

usersController.show = function (req, res, next) {

    model.find({}, (err, result) => {
        if (err) console.log(err);
        res.json({
            status: 200,
            result,
            message: "User's list retrieved successfully"
        })
    });
}

usersController.save = function (req, res) {

    var data = {
        nom: req.body.nom,
        prenom: req.body.prenom,
        address: req.body.address
    };
    model.create(data, (err, result) => {
        if (err) console.log(err);
        res.json({
            status: 200,
            message: "User added successfully"
        })
    });
}

usersController.delete = function (req, res) {

    let id = req.body._id;
    model.deleteOne({ _id: id }, (err, result) => {
        if (err) console.log(err);
        res.json({
            status: 200,
            message: "User deleted successfully"
        })
    });

}

usersController.edit = function (req, res) {

    var body = req.body;
    model.updateOne({ _id: body._id }, {
        $set: {
            nom: body.nom,
            prenom: body.prenom,
            address: body.address
        }
    }, { multi: true }, (err, result) => {
        if (err) { console.log(err); }
        res.json({
            status: 200,
            message: "User updated successfully"
        })
    });
}


module.exports = usersController;