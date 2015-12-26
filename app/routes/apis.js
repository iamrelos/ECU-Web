var config = require('../../config/config');
var request = require('request');
var Parse = require('parse/node').Parse;

module.exports = function (app, express) {

    var api = express.Router();

    app.use('/api', api);

    api.get('/youtube', function (req, res) {
        var max = req.query.max || 10;
        var page = req.query.page || '';
        var key = config.apis_keys.youtube;
        var url = 'https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=UU3bdjHToDAsKUghgGq00c8Q&maxResults='+max+'&pageToken='+page+'&key=' + key;

        request(url, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                var json = JSON.parse(response.body);

                var data = {
                    next: json.nextPageToken,
                    prev: json.prevPageToken,
                    videos: []
                };

                json.items.forEach(function(item, index, array){
                    var imageUrl = "";

                    if (item.snippet.thumbnails.maxres != null)
                        imageUrl = item.snippet.thumbnails.maxres.url;
                    else if (item.snippet.thumbnails.standard != null)
                        imageUrl = item.snippet.thumbnails.standard.url;
                    else if (item.snippet.thumbnails.high != null)
                        imageUrl = item.snippet.thumbnails.high.url;
                    else if (item.snippet.thumbnails.medium != null)
                        imageUrl = item.snippet.thumbnails.medium.url;
                    else
                        imageUrl = item.snippet.thumbnails["default"].url;

                    var video = {
                        id: item.snippet.resourceId.videoId,
                        title: item.snippet.title,
                        videoUrl: "https://www.youtube.com/embed/" + item.snippet.resourceId.videoId,
                        publishedAt: item.snippet.publishedAt,
                        description: item.snippet.description,
                        imageUrl: imageUrl
                        //publishedAt: new Date(item.snippet.publishedAt.Year, item.snippet.publishedAt.Month, item.snippet.publishedAt.Day),
                    };


                    data.videos.push(video);
                });

                res.send(data);
            }
        })
    });

    api.get('/soundcloud', function (req, res) {
        var url = 'http://api.soundcloud.com/users/146006073/tracks.json?client_id=500f3c5cdcf76cb1bcc8c35e97864840';

        request(url, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                var songs = [];
                var json = JSON.parse(response.body);

                json.forEach(function(item, index, array) {
                    var cover = item.artwork_url;

                    cover = (cover) ? cover.replace("large", "t500x500") : "https://i1.sndcdn.com/avatars-000138805507-sejp8z-t500x500.jpg";

                    var track = {
                        title: item.title,
                        trackId: item.id,
                        url: item.permalink_url,
                        imageUrl: cover,
                        dateCreated: item.created_at
                    };

                    songs.push(track);
                });

                res.send({success: true, message: '', data: songs});
            }

        })
    });

    api.post('/subscribe', function(req, res){
        var email = req.body.email;

        if (!email) res.send({success: false, message: 'Email is empty.'});

        var Subscription = Parse.Object.extend("Subscription");
        var query = new Parse.Query(Subscription);
        query.equalTo("canonical", email.toUpperCase());
        query.first({
            success: function(object) {
                if (object) {
                    if (!object.get('isActive')) {
                        res.send({success: false, message: 'Email already found but is not active.'});
                    }

                    res.send({success: false, message: 'Email already found.'});
                } else {
                    var Subscription = Parse.Object.extend("Subscription");
                    var subscription = new Subscription();

                    subscription.set("email", email);
                    subscription.set("isActive", true);
                    subscription.set("canonical", email.toUpperCase());

                    subscription.save(null, {
                        success: function(subscription) {
                            res.send({success: true, message: 'Gracias por suscribirte!!!', data: subscription.toJSON()});
                        },
                        error: function(subscription, error) {
                            res.send({success: false, message: 'Failed to create new object, with error code: ' + error.message});
                        }
                    });
                }
            },
            error: function(error) {
                res.send({success: false, message: 'Error code: ' + error.message});
            }
        });
    });
};