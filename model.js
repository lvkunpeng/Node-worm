// 连接数据库
// 
// 1.引入mongoose
// 2.连接数据库
// 3.创建Schema
// 4.导出模型
var mongoose = require('mongoose');
mongoose.connect('mongodb://118.89.241.233/gushiwen');
var CategorySchema = new mongoose.Schema({
    name: String,
    url: String
});
var ListSchema = new mongoose.Schema({
    cate: String,
    title: String,
    author: String,
    desc: String,
    url: String
});
var DetailSchema = new mongoose.Schema({
    cate: String,
    title: String,
    author: String,
    dynasty: String,
    content: String,
    url: String
});
exports.Category = mongoose.model('Category', CategorySchema);
exports.List = mongoose.model('List', ListSchema);
exports.Detail = mongoose.model('Detail', DetailSchema);
