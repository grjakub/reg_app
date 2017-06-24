const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const regHelper = {
    email: /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i,
    password: /^[a-zA-Z\-]+$/,
    user :  /^[a-zA-Z\-]+$/
}

let globValidator = {
    checkValu: (param, valid) => {
            if (!param) {return false;} else {
                return regHelper.valid.test(param);
            }
         },
   lengthChecker: (param, min, max) => {
    if (!param) {return false;} else {
        if (param.length < min || param.length > max) {
            return false;
        } else { return true;}
    }
   }
}

let emailChecker = (email) => {
    if (!email) {
        return false;
    } else {
        if (email.length < 5 || email.length > 30) {
            return false;
        } else {
            return true;
        }
    }
};

let emailValidCheck = (email) => {
    if (!email) {
        return false;
    } else {
        const validValue = regHelper.email;

        return validValue.test(email);
    }
}

const emailValidator = [{
        validator:  emailChecker, message: "Email need to be from 5 to 30 letters"
    },
    {
        validator : emailValidCheck,
        message: "Must be validate email1"
    }];

let userValidCheck = (username) => {
    if (!username) {
        return false;
    } else {
        const validValue = /^[a-zA-Z\-]+$/;

        return validValue.test(username);
    }
}


let userLength = (username) => {
    if (!username) {
        return false;
    } else {
        if (username.length < 5 || username.length > 22) {
            return false;
        } else {
            return true;
        }
    }
}

const userValidators = [{
        validator:  userLength, 
        message: "User need to be between 5 a 22 char"
    },{
        validator: userValidCheck, 
        message: "User cannot have special char"
    }];

let passwordLength = (password) => {
    if (!password) {
        return false;
    } else {
        if (password.length < 8 || password.length > 22) {
            return false;
        } else {
            return true;
        }
    }
}

let passwordValidCheck = (password) => {
    if (!password) {
        return false;
    } else {
        const validValue = /^[a-zA-Z\-]+$/;

        return validValue.test(password);
    }
}

let textAreaLength = (textAreaLength) => {
    if (!textAreaLength) {
        return null;
    } else {
        if (textAreaLength.length > 167) {
            return false;
        } else {
            return true;
        }
    }
}
console.log(textAreaLength)

const passwordValidators = [{
        validator:  passwordLength, message: "password need to be between 8 a 22 char"
    },{
        validator: passwordValidCheck, message: "password cannot have special char"
    }];

const Schema = mongoose.Schema,
      bcryot = require('bcrypt-nodejs'),
      userSchema = new Schema({
      email: { type: String, require: true, unique: true, lowercase:true, validate: emailValidator },
      first_name: { type: String, require: true, unique: true, lowercase:true, validate: userValidators },
      last_name: { type: String, require: true, unique: true, lowercase:true, validate: userValidators },
      ticket: { type: Number, require: true, unique: false },
      textarea_1: { type: String, require: false, unique: false, lowercase:true },
      textarea_2: { type: String, require: false, unique: false, lowercase:true },
      password: { type: String, require: true, validate: passwordValidators }
    });

    userSchema.pre('save', function (next) {
        if(!this.isModified('password')) {
            return next();
        } else {
            bcryot.hash(this.password, null, null, (err, hash) => {
            if (err) {
                return next(err);
            } else {
              this.password = hash;
                next();  
                }
            })
        }
    });

    userSchema.methods.checkPassword = (password) => {
        return bcryot.compareSync(password, this.password);
    }

    module.exports = mongoose.model('User', userSchema);

