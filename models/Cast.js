const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

const castSchema = new Schema({
    person:{
        id: String,
        url: String,
        name: String,
        country:{
            name: String,
            code: String,
            timezone: String
        },
        birthday: String,
        deathday: String,
        gender: String,
        image:{
            medium: String,
            original: String
        },
        _links:{
            self:{
                href: String
            }
        }
    },
    character: {
        id: String,
        url: String,
        name: String,
        image:{
            medium: String,
            original: String
        },
        _links:{
            self:{
                href: String
            }
        }
    }
});


module.exports = mongoose.model('Cast', castSchema);
