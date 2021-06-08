module.exports = app => {
    const mongoose = require('mongoose');
    mongoose.connect('mongodb://127.0.0.1:27017/nodevue', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }, function (err) {
        if(err) {
            console.log("连接失败", err);
        } else {
            console.log("连接成功");
        }
    })
}
