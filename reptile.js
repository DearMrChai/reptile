var request = require('request');
var cheerio = require('cheerio');
var Entities = require('html-entities').XmlEntities;
var mongodb = require('./mongodb');
let public = require('./public');
entities = new Entities(); //解析
exports.getHotMovie = function getHotMovie(url) {
    request(url, function (err, response, body) {
        if (!err && response.statusCode == 200) {
            $ = cheerio.load(body);
            content = $('div.item')
            content.each(function (index, item) {
                let obj = {}
                obj.rank = parseInt($(content[index]).find('div.pic em').html()) //排名
                obj.img = $(content[index]).find('div.pic a img').attr('src') //照片链接
                obj.cName = entities.decode($(content[index]).find('span.title').html()) //中文名
                obj.inq = entities.decode($(content[index]).find('span.inq').html()) //英文名
                obj.people = parseInt(entities.decode($(content[index]).find('div.star span').next().next().next().html()).replace("人评价", "")) //评价人数
                obj.rating_num = parseFloat($(content[index]).find('div.bd span.rating_num').html()) //评分
                obj.eName = entities.decode($(content[index]).find('span.title').next().html()) //英文名
                obj.otherName = entities.decode($(content[index]).find('span.other').html()) //其他名字
                obj.canPlay = public.toBoolean(entities.decode($(content[index]).find('span.playable').html())) //是否可播放
                obj.movieInfo = public.removeVoid(entities.decode($(content[index]).find('div.bd p').html())) //一句话简介
                obj.aHref = $(content[index]).find('div.pic a').attr('href') //跳转链接
                mongodb.mongos(obj)
            })
        } else {
            console.info("抓取失败:", err)
        };
    })
}