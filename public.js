// 将数据转化成布尔值
// 如果有参数则为true==1
// 如果无参数则为false==0
exports.toBoolean = function toBoolean(data) {
    if (data == '' || data == null) {
        data = 0
    } else {
        data = 1
    };
    return data;
};

// 去除字符串中的空格和br
exports.removeVoid = function removeVoid(str) {
    return str.replace(/\s*/g, "").replace("...<br>","");
};

