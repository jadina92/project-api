const { response } = require('express');
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var session = require('express-session');
var flash = require('connect-flash');

var MongoClient = require('mongodb').MongoClient;
var app = express();





app.use(cors());
app.use(bodyParser.json());
// Utilise Body-Parser, pour pouvoir lire les entrées d'un formulaire
// le stocke comme un obj Javascript
// accessible via req.body
app.use(bodyParser.urlencoded({ extended: false }));

app.use(session({
  cookie: { maxAge: 60000 },
  secret: 'woot',
  resave: false,
  saveUninitialized: false
}));

app.use(flash());

app.use('/assets/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));

// Déclaration de vues Embedded Javascript (EJS)
app.set('engine_view', 'ejs');

app.use((err, req, res, next) => {
  res.locals.error = err;
  const status = err.status || 500;
  res.status(status);
  res.render('error');
 
});






MongoClient.connect('mongodb://localhost:27017', { useUnifiedTopology: true }, (
    err, client) => {
        if(err){
            throw err;
        }
        var db = client.db("formation");
        var users= db.collection("users");
        //Insertion
       users.insertOne({nom: "Wick", prenom: "Jhon",adress:"dcdscosdcs"},(err,result)=>{
            if(err){
                throw err;
            }
            console.log(result.result.n);
            console.log(result.ops.length);
            console.log(result.result.n + " Inséré avec success");
        })
        //Lecture
        users.find().toArray(function(err,result){
            if(err){throw err;}
            console.log(result)
        })
        users.updateOne({ prenom: 'Jhon' }, {
            $set: {
                nom:
                    'Travolta'
            }
        }, { multi: true }, (err, result) => {
            if (err)
                throw err;
            if (result.result.nModified > 0)
                console.log('au moins ' + result.result.nModified + ' documents modifies');
        });
       users.deleteMany({nom:"Travolta"},(error,result)=>{
            if(error)
            throw error;
            if(result.result.n>0)
            console.log(result.result.n + "documents supprimés")
            else
            console.log("aucun element correspondant aux critéres choisis")
        })
       


    
    //    app.get('/users', function(req, res){
    //         // Création de la requete
    //        users.find().toArray(function(err,result){
    //             if (err){
    //                 res.redirect('/');
    //             }
    //             res.json({
    //                 status : 200,
    //                 result,
    //                 message:'person list retrieved successfully'
    //             })
    //         });
    //     });
        

    //     app.get('/delete/:id', function(req, res){
    //         // Création de la requete
    //         const id = req.params.id;
    //        users.deleteOne({_id: new mongodb.ObjectID(id)},(error,result)=>{
    //          if(err){throw err;}
    //          res.redirect('/')
    //      })
    //      })

    //      app.post('/add', function(req, res){
    //         // Création de la requete
    //         if(!req.body.txtId){
    //         users.insertOne({nom : req.body.txtNom,
    //              prenom : req.body.txtPrenom,
    //              address:req.body.textaddress},(error,result)=>{
    //             if (err){
    //                 res.redirect('/');
    //             }
    //             res.json({
    //                 status : 200,
    //                 result,
    //                 message:'person added successfully'
    //             })
    //         });
       
    //     }else{
    //         users.updateOne({_id: new mongodb.ObjectID(req.body.txtId)}, {
    //             $set:{
    //                 nom:req.body.txtNom,
    //                 prenom: req.body.txtPrenom,
    //                 address : req.body.textaddress
    //             }
    //         }, (error, result) => {
    //             if (err){
    //                 res.redirect('/');
    //             }
    //             res.json({
    //                 status : 200,
    //                 result,
    //                 message:'person updated successfully'
    //             })
    //         });
    //     }
       
        
    //      })
         





var server = {
  port: 8080
};

app.listen(server.port, () => console.log(`Server started, listening port: ${server.port}`));

// app.listen(8080, function () {
//     console.log("Express en attente");
});