const express = require('express')
const app = express();
const got = require('got');


// Connection URL
var url = 'mongodb://localhost:27017/myproject';

const mongoose = require('mongoose');

mongoose.connect(url,function(){
    /* Drop the DB */
    mongoose.connection.db.dropDatabase();
}); 
mongoose.Promise = global.Promise; // Tell Mongoose to use ES6 promises


const Show = require('./models/Show');
const Cast = require('./models/Cast');


const getCast = async (shows) => {
    try {  
        const promises = shows.map(async (show) => {
            // if no cast load it from tvmaze
            if (!show.cast || show.cast.length < 1) {
                const response = await got.get(`http://api.tvmaze.com/shows/${show.id}/cast`, {json: true})
                let castListPromises = response.body.map( async cast => {
                    // update or insert the cast on DB
                    return await Cast.update(cast, cast, { upsert: true, new: true }).then((newCast) => {
                        return mongoose.Types.ObjectId(newCast.upserted[0]._id);;
                    });
                });
                const castList = await Promise.all(castListPromises)
                let newShow = show;
                newShow.cast = castList;
                return Show.findOneAndUpdate({id: show.id}, newShow, {upsert: true, new: true}).populate('cast', '-_id person.name person.birthday').sort({'person.birthday':-1});
            }
            else {
                return show;
            }
        });
        return await Promise.all(promises)

    } catch (e) {
        console.log('error-->', e);
    }
}


const writeShowsDB = (showList) => {
    try {
        Show.insertMany(showList)   
    } catch (error) {
        console.error('error->', error);
        throw error;
    }
}

const scrapShow = async () => {
    let page = 0;
    let showsList;
    do {
        try {
            const response = await got.get(`http://api.tvmaze.com/shows?page=${page}`, {json: true});
            showsList = response.body;
            page++;   
            writeShowsDB(showsList);
        } catch (error) {
            showsList = [];
        }
    }while(showsList.length > 0 );
}

app.get('/show/:id', (req, res) => {
    let skip = 0;
    if (req.query.page && req.query.page > 0) {
        skip = req.query.page * 10;
    }
    Show.find({ "id" : { $regex: req.params.id } }, null, { limit: 10, skip: skip }).populate('cast', '-_id person.name person.birthday').sort({'person.birthday':-1})
    .then(async (response) => {
        const showList = await getCast(response);
        res.status(200).json({shows: showList, page: req.query.page});
        return;
    }).catch((err) => {
        console.error(err);
        res.status(500).json({err: err});
        return;
    })
})

app.listen(3000, () => {
    scrapShow();
    console.log('TvMaze Scraper listening on port 3000!')
})

module.exports = app;