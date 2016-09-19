let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let bcrypt = require('bcrypt-nodejs');

// set up a mongoose model
let UserSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    displayName: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    roleId: {
        type: String,
        required: true
    }
});

UserSchema.pre('save', function(next) {
    let user = this;
    //密碼變更或新密碼時
    if (user.isModified('password') || this.isNew) {
        bcrypt.genSalt(10, function(err, salt) {
            if (err) {
                return next(err);
            }
            bcrypt.hash(user.password, salt, null, function(err, hash) {
                if (err) {
                    return next(err);
                }
                //使用hash取代明文密碼
                user.password = hash;
                next();
            });
        });
    } else {
        return next();
    }
});

/**
 * mongoose支持擴展方法，因此撰寫密碼驗證
 * @param  {[string]}   password [密碼]
 * @param  {Function} callback [description]
 * @return {[type]}            [description]
 */
UserSchema.methods.comparePassword = function(candidatePassword, callback) {
    bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
        if (err) {
            return callback(err);
        }
        callback(null, isMatch);
    });
};

module.exports = mongoose.model('User', UserSchema);
