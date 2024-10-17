const express = require('express');
const router = express.Router();

const data = {}; //empty object
data.employees  = require('../../data/employees.json'); // like connecting to db

router.route('/') //chaining the http methods : code will be different in future
    .get((req, res)=>{ //http method get
        res.json(data.employees);
    })
    .post((req, res)=>{ //http method post
        res.json({
            "firstname" : req.body.firstname,
            "lastname": req.body.lastname
        });
    })
    .put((req, res)=>{
        res.json({
            "firstname" : req.body.firstname,
            "lastname": req.body.lastname
        });
    })
    .delete((req, res)=>{
        res.json({ "id": req.body.id});
    });

//paramtere : get request with paramterer
router.route('/:id')
    .get((req, res)=>{ 
        res.json({"id": req.params.id});
    });


module.exports  = router;
