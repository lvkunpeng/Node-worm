var request = require('request');
var iconv = require('iconv-lite');
var cheerio = require('cheerio');
var fs = require('fs');
// var url = 'http://www.gushiwen.org/';
// 获取页面内容 request
// 将页面内容进行转码 iconv
// 提取页面内信息 cheerio
// 将信息放入构造对象 
// 
// 
// 抓取分类列表
exports.readCategory = function(url, callback) {
    var categories = [];
    request({ url, encoding: null }, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            var $ = cheerio.load(body);
            $('.main2 .cont a').each(function(index, item) {
                var $this = $(item);
                var category = {
                    name: $this.text(),
                    url: $this.attr('href')
                }
                console.log('捕获分类:', category.name);
                categories.push(category);
            });
        }
        callback(null, categories);
    });
}

// exports.category(url, function(err, categories) {
//     console.log(categories)
// })
// 
// 
// 抓取描述列表
exports.readList = function(cate, url, callback) {
    var lists = [];
    request({ url, encoding: null }, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            var $ = cheerio.load(body);
            $('.sons').each(function(index, item) {
                var $this = $(item);
                var list = {
                    cate: cate,
                    title: $this.children('p').eq(0).children('a').eq(0).text(),
                    author: $this.children('p').eq(1).text(),
                    desc: $this.children('p').eq(2).text(),
                    url: 'http://so.gushiwen.org/' + $this.children('p').eq(0).children('a').eq(0).attr('href')
                }
                console.log('捕获[', list.cate, ']分类下列表:', list.title);
                lists.push(list);
            });
        }
        callback(null, lists);
    });
}

// exports.list('先秦', 'http://so.gushiwen.org/type.aspx?p=1&c=%E5%85%88%E7%A7%A6', function(err, lists) {
//         console.log(lists)
//     })
// 
// 
// 
// 抓取详情内容
exports.readDetail = function(cate, url, callback) {
    var details = [];
    request({ url, encoding: null }, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            var $ = cheerio.load(body);
            $('.shileft').each(function(index, item) {
                var $this = $(item);
                var reg = /view_(\d+)/g;
                url = url.match(reg)[0];
                var detail = {
                    url: url,
                    cate: cate,
                    title: $this.children('.son1').eq(0).children(' h1').eq(0).text(),
                    dynasty: $this.children('.son2').eq(0).children('p').eq(0).text(),
                    author: $this.children('.son2').eq(0).children('p').eq(1).text(),
                    content: $this.children('.son2').eq(0).children('p').eq(3).text(),
                }
                console.log('捕获详情:', detail.title);
                details.push(detail);
            });
        }
        callback(null, details);
    });
}

// exports.detail('先秦', 'http://so.gushiwen.org/view_1.aspx', function(err, details) {
//     console.log('dddd', details)
// })
