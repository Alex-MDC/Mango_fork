
var mongoose = require("mongoose")
var Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

var UserSchema = Schema ({
    name: String,
    username: String,
    password: String,
   // user_id: String,
    //favorite games hold the GameID for further API requests
    puntos: {type: Number, default: 0}
    }
);

module.exports = mongoose.model('user', UserSchema);