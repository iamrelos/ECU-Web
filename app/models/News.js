var mongoose = require('mongoose');

var News = new mongoose.Schema({
    permalink: String,
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now},
    description: String,
    imageUrl: String,
    title: String,
    isActive: {type: Boolean, default: true},
    sourceTitle: String,
    sourceUrl: String
});

News.methods.toVM = function() {
    var _this = this;

    return {
        permalink: _this.permalink,
        createdAt: _this.createdAt,
        updatedAt: _this.updatedAt,
        description: _this.description,
        imageUrl: _this.imageUrl,
        title: _this.title,
        sourceTitle: _this.sourceTitle,
        sourceUrl: _this.sourceUrl
    };
};

module.exports = mongoose.model('News', News, 'News');