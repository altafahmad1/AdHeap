const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const uniqid = require("uniqid");
const connection = require("./../configs/DBConnection");
const auth = require("./../middleware/auth");

router.post("/register", async(req, res)=>{
    try{

        const {name, email, password, confirmPassword} = req.body;
        
        if (password.length < 8){
            return res
                .status(400)
                .json({msg: "The password needs to be at least 8 characters long."});
        }
        if (password !== confirmPassword){
            return res
                .status(400)
                .json({msg: "Your passwords do not match."});
        }

        connection.query("SELECT email FROM users WHERE email = ? ", [email], (error, rows)=>{
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
                        bcrypt.hash(password, salt, function(err, hash) {
                            let user = {
                                id: uniqid(),
                                name: name,
                                email: email,
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
        const {email, password} = req.body;

        connection.query("SELECT id, name ,password FROM users WHERE email = ? ", [email], (error, rows)=>{
            if(error){
                res.json(error);
            }
            else {
                if(rows.length === 0){
                    res
                        .status(400)
                        .json({msg: "No user with this email exists."});
                } else {

                    bcrypt.compare(password, rows[0].password, function(err, result) {
                        if(err){
                            res.json(error);
                        }
                        else {
                            if(!result){
                                res
                                    .status(400)
                                    .json({msg: "Invalid Credentials."});
                            }
                        }
                    });

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