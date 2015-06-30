var User = require('../models/user'),
Key  = require('../models/key');


exports.addSSHKey = function(req,res){
  new Key({
	    name : req.body.name,
      publickey: req.body.publickey,
      user : req.body.user
  }).save(function(err, key, count){
    res.redirect('/settings/security');
  });
};


// exports.getSSHKeys = function(req, res) {
//         Key.find(function(err, keys) {
//             //res.send(keys);
//
//          res.render(req.render, {keys: req.keys});
//
// 
//     });
// }
