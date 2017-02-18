var readCate = require('./read').readCategory;
var readList = require('./read').readList;
var readDetail = require('./read').readDetail;
var writeCate = require('./write').writeCategory;
var writeList = require('./write').writeList;
var writeDetail = require('./write').writeDetail;
var Category = require('./model').Category;
var List = require('./model').List;
var Detail = require('./model').Detail;
var async = require('async');
var url = 'http://www.gushiwen.org/';
module.exports.run = function() {
    async.waterfall([
        function(callback) {
            async.parallel([
                function(cb) {
                    Category.remove({}, cb)
                },
                function(cb) {
                    List.remove({}, cb)
                },
                function(cb) {
                    Detail.remove({}, cb)
                }
            ], callback);
        },
        function(data, callback) {
            readCate(url, callback);
        },
        function(categories, callback) {
            writeCate(categories, callback);
        },
        function(categories, callback) {
            var Lists = [];
            async.forEach(categories, function(cate, cb) {
                readList(cate.name, cate.url, function(err, items) {
                    Lists = Lists.concat(items);
                    cb();
                });
            }, function() {
                callback(null, Lists);
            })
        },
        function(Lists, callback) {
            writeList(Lists, callback);
        },
        function(Lists, callback) {
            var Details = [];
            async.forEach(Lists, function(list, cb) {
                readDetail(list.cate, list.url, function(err, items) {
                    Details = Details.concat(items);
                    cb();
                });
            }, function() {
                callback(null, Details);
            });
        },
        function(Details, callback) {
            writeDetail(Details, callback);
        }
    ], function(err, result) {
        console.log('任务执行完成');
    });
};
