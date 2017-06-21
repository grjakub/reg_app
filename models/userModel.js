const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema,
      bcryot = require('bcrypt-nodejs'),
      userSchema = new Schema({
      email: { type: String, require: true, unique: true, lowercase:true },
      firstname: { type: String, require: true, unique: true, lowercase:true },
      lastname: { type: String, require: true, unique: true, lowercase:true },
      infoone: { type: String, require: true, unique: false, lowercase:true },
      infotwo: { type: String, require: true, unique: false, lowercase:true },
      password: { type: String, require: true }
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
    })

    userSchema.methods.checkPassword = (password) => {
        return bcryot.compareSync(password, this.password);
    }

    module.exports = mongoose.model('User', userSchema);

