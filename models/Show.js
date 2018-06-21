const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

const showSchema = new Schema({
    id: String,
    url: String,
    name: String,
    type: String,
    language: String,
    genres: Array,
    status: String,
    runtime: Number,
    premiered: String,
    officialSite: String,
    cast: [{ type: Schema.Types.ObjectId, ref: 'Cast' }],
    schedule: {
        time: String,
        days: Array
    },
    rating: {
        average: Number
    },
    weight: Number,
    network: {
        id: Number,
        name: String
    },
    externals:{
        tvrage: Number,
        thetvdb: Number,
        imdb: String
    },
    image:{
        medium: String,
        original: String,
        summary: String,
        _links: {
            self: {
                href: String
            },
            previousepisode: {
                href: String
            }
        }
    }
});


module.exports = mongoose.model('Show', showSchema);
