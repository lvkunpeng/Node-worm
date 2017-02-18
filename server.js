var express = require('express');
var path = require('path');
var fs = require('fs');
var Category = require('./model').Category;
var List = require('./model').List;
var Detail = require('./model').Detail;
var CronJob = require('cron').CronJob;
var task = require('./main');
var app = express();
// 设置模版引擎
app.set('view engine', 'html');
app.set('views', path.resolve('views'));
app.engine('html', require('ejs').__express);
// 模板引擎设置结束
/*var cronJob = require('cron').CronJob;
var job1 = new cronJob("00 00 * * * 1",function(){
    console.log('开始更新');
    task.run();
});
job1.start();*/

// });
// job.start();
task.run();

app.get('/', function(req, res) {
    var c = req.query.c;
    var reg = /view_(\d+)/g;
    var viewId = req.url.match(reg);
    var title;
    Category.find({}, function(err, categories) {
        if (viewId) {
            title = '详情页|';
        } else if (c) {
            title = '分类|' + c
        } else {
            title = '首页';
        }
        c = c ? c : categories[0].name;
        if (viewId) {
            Detail.findOne({ url: viewId[0] }, function(err, details) {
                var lists = false;
                title += details.title;
                res.render('index', { categories, details, c, lists, title });
            });
        } else if (categories) {
            List.find({ cate: c }, function(err, lists) {
                var details = false;
                res.render('index', { categories, lists, c, details, title });
            });
        }
    })
});
app.listen(31,function () {
    console.log('端口号31成功监听')
});
