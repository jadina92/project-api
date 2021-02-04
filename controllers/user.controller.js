const model = require('../models/users.model')();

var userController = function () { }

userController.show = function (req, res, next) {

    model.find({}, (err, result) => {
        if (err) { console.log(err); }

        if (err){
            res.redirect('/');
        }
        res.json({
            status : 200,
            result,
            message:'person added successfully'
        })


    });
}

userController.edit = function (req, res) {
    let id = req.params.id;
    model.findById(id, (err, result) => {
        if (err) { console.log(err); }
        //result.status=!result.status;
        console.log(result.prenom);
        result.save();
        res.json({
            status : 200,
            result,
            message:'person modified successfully'
        })

       
    });
}

userController.delete = function (req, res) {

    let id = req.params.id;
    model.deleteOne({ _id: id }, (err, result) => {
        if (err) { console.log(err); }
        res.json({
            status : 200,
            result,
            message:'person deleted successfully'
        })
    })
}

userController.save = function (req, res) {

    if (req.body.id == 0) {

        var body = req.body;
        body.status = false;

        model.create(body, (err, result) => {
            if (err) { console.log(err); }
            res.redirect('/users/');
        });

    }
    else {

        var body = req.body;

        model.updateOne({ _id: body.id }, {
            $set: {
                nom: body.nom,
                prenom :body.prenom,
                address:body.adress
            }
        }, { multi: true }, (error, result) => {
            res.json({
                status : 200,
                result,
                message:'person updatedsuccessfully'
            })
    
        });
    }
}

module.exports = userController;