const connection = require("./../configs/DBConnection.js");
const bcrypt = require("bcrypt");

module.exports.register=function(req,res){
    let today = new Date();
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(req.body.password, salt, function(err, hash) {
            if(err){
                console.log(err);
            }
            else {
                let users={
                    "name":req.body.name,
                    "email":req.body.email,
                    "password":hash,
                    "created_at":today,
                    "updated_at":today
                }
                connection.query('INSERT INTO users SET ?',users, function (error, results, fields) {
                    if (error) {
                      res.json({
                          status:false,
                          message:error
                      })
                    }else{
                        res.json({
                          status:true,
                          data:results,
                          message:'user registered sucessfully'
                      })
                    }
                  });
            }
        });
    });
    
    
}