const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const uniqid = require("uniqid");
const connection = require("./../configs/DBConnection");
const auth = require("./../middleware/auth");
const transporter = require("./../controllers/nodemailerController");
const multer = require("multer");
const cloudinary = require('cloudinary').v2;
const path = require("path");
 
 // cloudinary configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
  });



const upload = multer({
    storage: multer.diskStorage({}),
    fileFilter: (req, file, cb) => {
      let ext = path.extname(file.originalname);
        if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png") {
        cb(new Error("File type is not supported"), false);
        return;
      }
      cb(null, true);
    },
  });

const storage = multer.memoryStorage();
const multerUploads = multer({ storage }).single('file');

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
                res
                    .status(500)
                    .json(error);
            }
            else {
                if(rows.length !== 0){
                    res
                        .status(400)
                        .json({msg: "A user with this email already exists."});
                } else {
                    bcrypt.genSalt(10, function(err, salt) {
                        bcrypt.hash(regPassword, salt, function(err, hash) {
                            const user = {
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
                res
                    .status(500)
                    .json(error);
            }
            else {
                if(rows.length === 0){
                    res
                        .status(400)
                        .json({msg: "No user with this email exists."});
                } else {

                    bcrypt.compare(logPassword, rows[0].password, function(err, result) {
                        if(err){
                            res
                                .status(500)
                                .json(error);
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
                res
                    .status(500)
                    .json(error);
            }
            else {
                res
                    .status(200)
                    .json({msg: "User Deleted."});
            }
        });
    } catch(err){
        res
            .status(500)
            .json(err);
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
        res
            .status(500)
            .json(err);
    }
});

router.post("/requestPassword", async(req, res)=>{
    try{
        const email = req.body.email;
        connection.query("SELECT name, email FROM users WHERE email = ? ", [email], (error, rows)=>{
            if(error){
                res
                    .status(500)
                    .json(error);
            }
            else {
                if(rows.length === 0){
                    res
                        .status(400)
                        .json({msg: "No user with this email exists."});
                }
                else {
                    const name = rows[0].name;
                    const newPass = uniqid();

                    bcrypt.genSalt(10, function(err, salt) {
                        bcrypt.hash(newPass, salt, function(err, hash) {
                            connection.query("UPDATE users SET password = ? WHERE email = ? ", [hash, email], (error, rows)=>{
                                if(error){
                                    res
                                        .status(500)
                                        res.json(error);
                                }
                                else {
                                    forgotPasswordEmail = `<div style="background-color: #002433; color:#fff; 
                                        font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
                                        text-align: center; padding: 1rem 10%;
                                        ">
                                            <h1>ADHEAP</h1>
                                            <h2>OOPS! Looks like you forgot your password.</h2>
                                            <p>Hi ${name},<br>
                                                We received a request that you forgot your password. 
                                                Don't Worry, here is your new password, but we recommend changing it as soon as possible.
                                                If you did not request it, then ignore this email and use this new password for a first time login.
                                                And then you can change it as you wish.
        
                                            </p>
                                            <h3>NEW PASSWORD</h3>
                                            <h2 style="color: 14ff85;">${newPass}</h2>
                                        </div>`;
        
                                    const forgotPasswordOptions = {
                                        from: 'noreply.adheap@gmail.com',
                                        to: email,
                                        subject: 'Forgot Password Request',
                                        html: forgotPasswordEmail
                                    }
        
                                    transporter.sendMail(forgotPasswordOptions, function(error, info){
                                        if (error) {
                                          res
                                            .status(500)
                                            .json(error);
                                        } else {
                                          res
                                            .status(201)
                                            .json({msg: "Email sent with the instructions to: " + email});
                                        }
                                      });
                                }
                            });
                        });
                    });
                       
                }
            }
        })
    } catch(err){
        res
            .status(500)
            .json(err);
    }
});

router.post("/:userId/postAd", upload.single("file") ,async(req, res) => {
    try {
        const userId = req.params.userId;
        const adId = uniqid();

        await cloudinary.uploader.upload(req.file.path, {public_id: adId}).then((result) => {
            const newAd = {
                ad_id: adId,
                image: result.secure_url,
                id: userId
            }
            connection.query("INSERT INTO ads set ? ", [newAd], (error, rows) => {
                if(error){
                    
                } else {
                    res
                        .status(201)
                        .json({msg: "Ad Created Successfully."});
                }
            });
        }).catch((error) =>  {
            res
                .status(500)
                .json(error);
        });
    } catch(err){
        res
            .status(500)
            .json(err);
    }
});

router.get("/ad/image", async(req, res)=>{
    try {

        connection.query("SELECT image FROM ads WHERE id = '6nrfq8kjzgvpbi' ", (error, rows) => {
            if(error){
                console.log(error);
            } else {
                           }
        });

    } catch(err){
        res
            .status(500)
            .json(err);
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