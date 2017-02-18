var Cate = require('./model').Category;
var List = require('./model').List;
var Detail = require('./model').Detail;
exports.writeCategory = function(categories, callback) {
    Cate.create(categories, callback);
};
exports.writeList = function(lists, callback) {
    List.create(lists, callback);
};
exports.writeDetail = function(details, callback) {
    Detail.create(details, callback);
};
