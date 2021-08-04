const mongoose  = require('mongoose');

const schema = mongoose.Schema({
    pname : String,
    description : String,
    size : String
});

module.exports = mongoose.model('propertydatas', schema);