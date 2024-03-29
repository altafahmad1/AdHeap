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
const valid = require("card-validator");
const axios = require("axios");
const uuidAPIKey = require('uuid-apikey');
 
 // cloudinary configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
  });

  //To convert JS Date to MYSQL format
function dateSQL(cDate) {
    return cDate.getFullYear()
           + '-'
           + ("0" + (cDate.getMonth()+1)).slice(-2)
           + '-'
           + ("0" + cDate.getDate()).slice(-2);
}


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

        const {regFName, regLName, regEmail, regPassword, regConfirmPassword} = req.body;
        
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

        connection.query("SELECT email FROM user WHERE email = ? ", [regEmail], (error, rows)=>{
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
                            const today = dateSQL(new Date());
                            const balance = 5.00;

                            const user = {
                                id_user: uniqid(),
                                first_name: regFName,
                                last_name: regLName,
                                email: regEmail,
                                password: hash,
                                user_since: today,
                                balance: balance
                            }
            
                            connection.query("INSERT INTO user set ?", user, (error, rows)=>{
                                if(error){
                                    res
                                        .status(500)
                                        .json(error);
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

        connection.query("SELECT id_user, first_name, last_name, email, balance, password FROM user WHERE email = ? ", [logEmail], (error, rows)=>{
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
                                const token = jwt.sign({id: rows[0].id_user}, process.env.JWT_SECRET);
                                res.json({
                                    token,
                                    user: {
                                        id_user: rows[0].id_user,
                                        first_name: rows[0].first_name, 
                                        last_name: rows[0].last_name,
                                        email: rows[0].email,
                                        balance: rows[0].balance
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

router.delete("/:userId/delete", async (req, res) => {
    try {
        const userId = req.params.userId;
        //Doing several queries to delete all the data related to user
        deleteAdHistoryQuery = "DELETE From ad_history WHERE ad_id IN (SELECT ad_id FROM ad WHERE user_id = ? )";
        deleteAdsQuery = "DELETE FROM ad WHERE user_id = ?";
        deleteUserPaymentsQuery = "DELETE FROM payment_user WHERE user_id = ?";
        deleteUserReviewsQuery = "DELETE FROM user_reviews WHERE user_id  = ?";
        deleteUserQuery = "DELETE FROM user WHERE id_user = ? ";
        

        connection.query(deleteAdHistoryQuery, [userId], (error, rows)=> {
            if(error){
                res
                    .status(500)
                    .json(error);
            }
        });

        connection.query(deleteAdsQuery, [userId], (error, rows) => {
            if(error){
                res
                    .status(500)
                    .json(error);
            }
        });

        connection.query(deleteUserPaymentsQuery, [userId], (error, rows) => {
            if(error){
                res
                    .status(500)
                    .json(error);
            }
        });

        connection.query(deleteUserReviewsQuery, [userId], (error, rows) => {
            if(error){
                res
                    .status(500)
                    .json(error);
            }
        });

        connection.query(deleteUserQuery, [userId], (error, rows) => {
            if(error){
                res
                    .status(500)
                    .json(error);
            }
        });



        // connection.query("DELETE FROM user WHERE id_user = ? ", [req.user], (error, rows)=>{
        //     if(error){
        //         res
        //             .status(500)
        //             .json(error);
        //     }
        //     else {
        //         res
        //             .status(200)
        //             .json({msg: "User Deleted."});
        //     }
        // });
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
        
        connection.query("SELECT * FROM user WHERE id_user = ?", [verified.id], (error, rows)=>{
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
        connection.query("SELECT first_name, email FROM user WHERE email = ? ", [email], (error, rows)=>{
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
                    const name = rows[0].first_name;
                    const newPass = uniqid();

                    bcrypt.genSalt(10, function(err, salt) {
                        bcrypt.hash(newPass, salt, function(err, hash) {
                            connection.query("UPDATE user SET password = ? WHERE email = ? ", [hash, email], (error, rows)=>{
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
        console.log("Hello");
        const {adTitle, adDuration, adCategory, adCountry, adSource, adDetails} = req.body;
        const userId = req.params.userId;
        const adId = uniqid();

        connection.query("SELECT balance FROM user WHERE id_user = ? ", [userId], (error, rows) =>{
            if(error){
                res
                    .status(500)
                    .json(error);
            }
            else {
                if((parseFloat(adDuration) * 0.5) > parseFloat(rows[0].balance)){
                    res
                        .status(400)
                        .json({msg: "Your balance is insufficient for this ad."});
                }
                else {
                    const updated_balance = parseFloat(rows[0].balance) - (parseFloat(adDuration) * 0.5);
                    connection.query("UPDATE user SET balance = ? WHERE id_user = ?", [updated_balance, userId], async (error, rows)=>{
                        if(error){
                            res
                                .status(500)
                                .json(err);
                        }
                        else {
                            
                            await cloudinary.uploader.upload(req.file.path, {public_id: adId}).then((result) => {
                                const date = new Date();
                                const startingDate = dateSQL(date);
                                date.setDate(date.getDate() + parseInt(adDuration));
                                const endingDate = dateSQL(date);
                                const newAd = {
                                    ad_id: adId,
                                    ad_title: adTitle,
                                    ad_text: adDetails,
                                    ad_since: startingDate,
                                    active_till: endingDate,
                                    ad_category: adCategory,
                                    ad_country: adCountry,
                                    ad_image: result.secure_url,
                                    user_id: userId,
                                    ad_source: adSource
                                }
                                connection.query("INSERT INTO ad set ? ", [newAd], (error, rows) => {
                                    if(error){
                                        res
                                            .status(500)
                                            .json(error);
                                    } else {
                                        res
                                            .status(201)
                                            .json({msg: "Ad Created Successfully."});
                                    }
                                });
                                const newAdHistory = {
                                    id_ad_history: uniqid(),
                                    start_date: startingDate,
                                    end_date: endingDate,
                                    ad_id: adId,
                                    no_of_websites: 0
                                };


                                connection.query("INSERT INTO ad_history SET ? ", [newAdHistory], (error, rows) => {
                                    if(error){
                                        res
                                            .status(500)
                                            .json(error);
                                    }
                                })
                            }).catch((error) =>  {
                                res
                                    .status(500)
                                    .json(error);
                            });
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



router.post("/:userId/makePayment", async (req, res) => {
    try{
        const {cardNumber, amount} = req.body;
        const userId = req.params.userId;
        const numberValidation = valid.number(cardNumber);
        if(!numberValidation.isPotentiallyValid){
            return res
                .status(400)
                .json({msg: "The credit card number is invalid."});
        }
        else {
            if(numberValidation.card.type !== "visa" && numberValidation.card.type !== "mastercard"){
                return res
                    .status(400)
                    .json({msg: "Invalid Card. Only Visa and Mastercard are accepted."});
            }
            else {
                connection.query("SELECT balance FROM user WHERE id_user = ? ", [userId], (error, rows)=>{
                    if(error){
                        res
                            .status(500)
                            .json(error);
                    }
                    else {
                        const newAmount = parseFloat(amount) + parseFloat(rows[0].balance);
                        connection.query("UPDATE user SET balance = ? WHERE id_user = ?", [newAmount, userId], (error, rows)=>{
                            if(error){
                                res
                                    .status(500)
                                    .json(error);
                            }
                            else {
                                res
                                    .status(201)
                                    .json({msg: "User Balance Successfully Updated."});
                            }
                        });
                    }
                });
                const today = dateSQL(new Date());
                const newPayment = {
                    payment_id: uniqid(),
                    amount: parseFloat(amount),
                    payment_method: "Credit Card",
                    payment_date: today,
                    user_id: userId
                }
                connection.query("INSERT into payment_user SET ? ", newPayment, (error, rows)=>{
                    if(error){
                        res
                            .status(500)
                            .json(error);
                    }
                });
            }

        }
    } 
    catch(err){
        res
            .status(500)
            .json(err);
    }
});

router.post("/:userId/postUserReview", async (req, res) => {
    try {
        const userId = req.params.userId;
        const {reviewMessage} = req.body;
        const review = {
            review_id: uniqid(),
            message: reviewMessage,
            user_id: userId
        }
        connection.query("INSERT INTO user_reviews SET ?", [review], (error, rows)=>{
            if(error){
                res
                    .status(500)
                    .json(error);
            }
            else {
                res.json({msg: "Thank you for contacting us. We shall get back to you soon."});
            }
        });
    } 
    catch (err){
        res
            .status(500)
            .json(err);
    }
});

router.post("/postAnonReview", async (req, res) => {
    try {
        const {reviewName, reviewEmail, reviewPhoneNumber, reviewWebsite, reviewMessage} = req.body;
        const review = {
            review_id: uniqid(),
            email: reviewEmail,
            name: reviewName,
            phone_number: reviewPhoneNumber,
            website: reviewWebsite,
            message: reviewMessage
        }
        connection.query("INSERT INTO anon_reviews SET ? ", [review], (error, rows) =>{
            if(error){
                res
                    .status(500)
                    .json(error);
            }
            else{
                res.json({msg: "Thank you for contacting us. We shall get back to you soon."});
            }
        })
    }
    catch (err){
        res
            .status(500)
            .json(err);
    }
    
});

router.post("/ip", (req, res) => {
    axios.get("http://api.ipstack.com/" + req.body.ip + "?access_key=" + process.env.IPSTACK_KEY + "&format=1")
    .then((response) => {
        res.json({country: response.data.country_name});
    });
});

router.post("/:userId/postWebsite", async (req, res) => {
    try {
        const {websiteTitle, websiteCategory, websiteUrl} = req.body;
        const userId = req.params.userId;
        const newWebsite = {
            website_id: uniqid(),
            url: websiteUrl,
            api_key: uuidAPIKey.create().apiKey,
            category: websiteCategory,
            user_id: userId,
            website_name: websiteTitle
        }

        connection.query("INSERT INTO website SET ? ", [newWebsite], (error, rows)=>{
            if(error){
                console.log(error);
                res
                    .status(500)
                    .json(error);
            }
        });
    }
    catch(err){
        res
            .status(500)
            .json(err);
    }
});


router.get("/", auth, async(req, res)=>{
    connection.query("SELECT id_user, first_name, last_name, email ,balance FROM user WHERE id_user = ?", [req.user], (error, rows)=>{
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

router.get("/getUserAds", auth, async(req, res)=>{
    connection.query("SELECT ad_id, ad_title, ad_since, active_till, ad_category, ad_country, ad_image FROM ad WHERE user_id = ?", [req.user], (error, rows) => {
        if(error){
            res
                .status(500)
                .json(error);
        }
        else {
            res.json(rows);
        }
    });
});

router.get("/getUserWebsites", auth, async(req, res) =>{
    connection.query("SELECT * FROM website WHERE user_id = ? ", [req.user], (error, rows)=>{
        if(error){
            res
                .status(500)
                .json(error);
        }
        else {
            res.json(rows);
        }
    });
});

router.get("/getAds/:apiKeys/:category/:country", async(req, res) => {
    const apiKeys = req.params.apikeys;
    const country = req.params.country;
    const category = req.params.category;
    connection.query("SELECT * FROM ad WHERE ad_category = ? AND ad_country = ?", [category, country], (error, rows) => {
        if(error){
            res
                .status(500)
                .json(error);
        }
        else {
            res
                .json(rows);
        }
    });
});


module.exports = router;