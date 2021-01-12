const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const uniqid = require("uniqid");
const connection = require("./../configs/DBConnection");
const auth = require("./../middleware/auth");

router.post("/register", async(req, res)=>{
    try{

        const {regName, regEmail, regPassword, regConfirmPassword} = req.body;
        
        if (regPassword.length < 8){
            return res
                .status(400)
                .json({msg: "The password needs to be at least 8 characters long."});
        }
        if (regPassword !== regConfirmPassword){
            return res
                .status(400)
                .json({msg: "Your passwords do not match."});
        }

        connection.query("SELECT email FROM users WHERE email = ? ", [regEmail], (error, rows)=>{
            if(error){
                res.json(error);
            }
            else {
                if(rows.length !== 0){
                    res
                        .status(400)
                        .json({msg: "A user with this email already exists."});
                } else {
                    bcrypt.genSalt(10, function(err, salt) {
                        bcrypt.hash(regPassword, salt, function(err, hash) {
                            let user = {
                                id: uniqid(),
                                name: regName,
                                email: regEmail,
                                password: hash
                            }
            
                            connection.query("INSERT INTO users set ?", user, (error, rows)=>{
                                if(error){
                                    res.json(error);
                                }
                                else{
                                    res
                                        .status(201)
                                        .json({msg: "Account created successfully"});
                                }
                            });
                        });
                    });
                }

            }
        });

        
    } catch(err){
        res
        .status(500)
        .json(err);
    }   
});

router.post("/login", async (req, res) => {
    try {
        const {logEmail, logPassword} = req.body;

        connection.query("SELECT id, name ,password FROM users WHERE email = ? ", [logEmail], (error, rows)=>{
            if(error){
                res.json(error);
            }
            else {
                if(rows.length === 0){
                    res
                        .status(400)
                        .json({msg: "No user with this email exists."});
                } else {

                    bcrypt.compare(logPassword, rows[0].password, function(err, result) {
                        if(err){
                            res.json(error);
                        }
                        else {
                            if(!result){
                                res
                                    .status(400)
                                    .json({msg: "Invalid Credentials."});
                            }
                            else {
                                const token = jwt.sign({id: rows[0].id}, process.env.JWT_SECRET);
                                res.json({
                                    token,
                                    user: {
                                        id: rows[0].id,
                                        displayName: rows[0].name
                                    },
                                });
                            }
                        }
                    });
                    
                }

            }
        });
    } catch(err){
        res
        .status(500)
        .json(err);
    }
});

router.delete("/delete", auth, async (req, res) => {
    try {
        connection.query("DELETE FROM users WHERE id = ? ", [req.user], (error, rows)=>{
            if(error){
                res.json(error);
            }
            if(rows){
                res.json({msg: "User Deleted."});
            }
        });
    } catch(err){
        res.json(err);
    }
});


router.post("/tokenIsValid", async (req, res) => {
    try{
        const token = req.header("x-auth-token");
        if(!token)
            return res.json(false);

        const verified = jwt.verify(token, process.env.JWT_SECRET);
        if(!verified)
            return res.json(false);
        
        connection.query("SELECT * FROM users WHERE id = ?", [verified.id], (error, rows)=>{
            if(error){
                res.json(error);
            }
            else {
                if(rows.length === 0)
                    res.json(false);
                else{
                    res.json(true);
                }
            }
        });
    }catch(err){
        res.json(err);
    }
});

router.get("/", auth, async(req, res)=>{
    connection.query("SELECT id, name FROM users WHERE id = ?", [req.user], (error, rows)=>{
        if(error){
            res.json(error);
        }
        else{
            if(rows){
                res.json(rows[0]);
            }
        }
    });
});


module.exports = router;