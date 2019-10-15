var express = require('express');
var router = express.Router();
var accountModel = require('../models/account')
var bcrypt = require('bcryptjs')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


router.get('/list', (req,res,next)=> {
  accountModel.find({}).exec(function(err, result) {
    if(err){
      throw err;
    }
    res.json(result);
    console.log('value ' + result);
   
  })
})

// router.post('/login')


router.post('/register', (req,res,next)=>{
  const acc = req.body;
  if(acc.username!==undefined && acc.password!==undefined){
    bcrypt.hash(acc.password, 11, function(err, hash) {
      if(!err){
        acc.password = hash;
        let account = new accountModel({username: acc.username,password:acc.password});
        account.save((err,acc)=>{
          if(err){
            next(err);
          }else{
            console.log('creare account username '+ acc.username + ' successfully' );
            res.json({message:'create account successfully'});
          }
        })
      }
    });
  }
})





module.exports = router;
