
var mongoose = require("mongoose")
var Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

var UserSchema = Schema ({
    name: String,
    user_name: String,
    password: String,
   // user_id: String,
    //favorite games hold the GameID for further API requests
    puntos: Float64Array
    }
);

module.exports = mongoose.model('user', UserSchema);