let start = require('./reptile')
function startUp() {
    console.log("正在启动爬虫");
    for (let i = 0; i < 250; i += 25) {
        start.getHotMovie('https://movie.douban.com/top250?start=' + i + '&filter=');
    }
}
startUp()