var express = require('express');
var router = express.Router();
var passport = require('../auth/passport')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.get('/me', passport.authenticate('jwt', {session: false}),(req,res,next)=>{
  res.send({message:'welcome '+ req.user.jwtPayload.username});
})



module.exports = router;
