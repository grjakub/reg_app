const infoSet = require('./userInfo.json'),
      mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const regHelper = {
    email: /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i,
    password: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/,
    user :  /^[a-zA-Z\-]+$/
}

const letterCounter = {
    normal: {
        min: 5,
        max: 30
    },
    password:{
        min: 8,
        max: 30
    },
    textArea: {
        max: 167
    },
}

let emailChecker = (email) => {
    if (!email) {
        return false;
    } else {
        if (email.length < letterCounter.normal.min || email.length > letterCounter.normal.max) {
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

let userValidCheckFirst = (first_name) => {
    if (!first_name) {
        return false;
    } else {
        const validValue = regHelper.user;

        return validValue.test(first_name);
    }
}

let userValidCheckSecond = (first_name) => {
    if (!first_name) {
        return false;
    } else {
        const validValue = regHelper.user;

        return validValue.test(first_name);
    }
}

let userLengthFirst = (first_name) => {
    if (!first_name) {
        return false;
    } else {
        if (first_name.length < letterCounter.normal.min || first_name.length > letterCounter.normal.max) {
            return false;
        } else {
            return true;
        }
    }
}

let userLengthSecond = (last_nam) => {
    if (!last_nam) {
        return false;
    } else {
        if (last_nam.length < letterCounter.normal.min || last_nam.length > letterCounter.normal.max) {
            return false;
        } else {
            return true;
        }
    }
}

let passwordLength = (password) => {
    if (!password) {
        return false;
    } else {
        if (password.length < letterCounter.password.min || password.length > letterCounter.password.max) {
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
        if (textAreaLength.length > letterCounter.textArea.max) {
            return false;
        } else {
            return true;
        }
    }
}

const emailValidator = [{
        validator: emailChecker, 
        message: infoSet.emailInfo.length
    },
    {
        validator : emailValidCheck,
        message: infoSet.emailInfo.validInfo
    }];

const userValidatorsFirst = [{
        validator:  userLengthFirst, 
        message: infoSet.uerInfo.length
    },{
        validator: userValidCheckFirst, 
        message: infoSet.uerInfo.validInfo
    }];

const userValidatorsSecond = [{
        validator:  userLengthSecond, 
        message: infoSet.uerInfo.length
    },{
        validator: userValidCheckSecond, 
        message: infoSet.uerInfo.validInfo
    }];    

const passwordValidators = [{
        validator:  passwordLength, 
        message: infoSet.passwordInfo.length
    },{
        validator: passwordValidCheck, 
        message: infoSet.passwordInfo.validInfo
    }];

const textAreaValid = [{
        validator:  textAreaLength, 
        message:  infoSet.textInfo.textInfo
    }];

let   Schema = mongoose.Schema,
      bcryot = require('bcrypt-nodejs'),
      userSchema = new Schema({
      email: { type: String, require: true, unique: true, lowercase:true, validate: emailValidator },
      first_name: { type: String, require: true, unique: false, lowercase:true, validate: userValidatorsFirst },
      last_name: { type: String, require: true, unique: false, lowercase:true, validate: userValidatorsSecond },
      ticket: { type: Number, require: true, unique: false },
      textarea_1: { type: String, require: false, unique: false, lowercase:true, validate: textAreaValid },
      textarea_2: { type: String, require: false, unique: false, lowercase:true, validate: textAreaValid },
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

