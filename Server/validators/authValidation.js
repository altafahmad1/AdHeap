const expressValidator = require("express-validator");

let validateRegister = [
    expressValidator.check("email", "Invalid email").isEmail().trim(),
    expressValidator.check("password", "Invalid password. Password must be at least 8 characters long").isLength({min:8}),
    expressValidator.check("passwordConfirmation", "Password confirmation does not match password")
        .custom((value, {req}) => {
            return value === req.body.password;
        })
];

let validateLogin = [
    expressValidator.check("email", "Invalid email").isEmail().trim(),
    expressValidator.check("password", "Invalid password").not().isEmpty()
];

module.exports = {
    validateRegister: validateRegister,
    validateLogin: validateLogin
};