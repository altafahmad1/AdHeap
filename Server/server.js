require('dotenv').config();
const express  = require("express");
const bodyParser  = require("body-parser");
const cookieParser  = require("cookie-parser");
const cors = require("cors");
const app = express();

app.use(cookieParser(process.env.SESSION_SECRET));
app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/user", require("./routes/userRouter"));                                  

let port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Server started on port ${port}!`));

