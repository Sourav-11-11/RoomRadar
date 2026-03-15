const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose").default;

const userSchema = new mongoose.Schema({

    email: {
        type: String,
        required: true,
        unique: true
    }

   // username and password will be added by passport-local-mongoose plugin
});

userSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model('User', userSchema);