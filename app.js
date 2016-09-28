var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var wechat = require('wechat');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//weixin 
var config = {
	token: 'seeyoung',
	appid: 'wxb63064d927d9071f',
	encodingAESKey: '0SULh0V7ughD1CKvBR1ZCJJgwB6A8tMR5CegIOZoy6f'
};

app.use(express.query());
app.use('/wechat', wechat(config, function(req, res, next) {
	// 微信输入信息都在req.weixin上
	var message = req.weixin;
    console.log(message);
    var strMsg = '';
    var htmlMsg = '<ul>';
    var imgMsg = '';
    for(k in message){
        var strline = k+':'+message[k]+';\r\n';
        strMsg += strline;
        htmlMsg += '<li>'+strline+'</li>';
    }
    htmlMsg+='</ul>';
    res.reply(htmlMsg);
    res.reply({
          type: "image",
          content: {
              mediaId: 'mediaId',
              picurl:'http://image.baidu.com/search/detail?ct=503316480&z=&tn=baiduimagedetail&ipn=d&word=%E8%8B%B1%E9%9B%84&step_word=&ie=utf-8&in=&cl=2&lm=-1&st=-1&cs=529237590,3212224644&os=3949005886,1443351653&simid=719621,586131151&pn=7&rn=1&di=125162599430&ln=1935&fr=&fmq=1475096158631_R&fm=ala&ic=0&s=undefined&se=&sme=&tab=0&width=&height=&face=undefined&is=0,0&istype=2&ist=&jit=&bdtype=0&adpicid=0&pi=0&gsm=0&objurl=http%3A%2F%2Fi2.17173cdn.com%2Fi7mz64%2FYWxqaGBf%2Ftu17173com%2F20141113%2FHMDYdNbjgtFbAtE.jpg&rpstart=0&rpnum=0&adpicid=0'
          }
    });
	////if (message.FromUserName === 'diaosi') {
	////	// 回复屌丝(普通回复)
	////	res.reply('hehe');
	////}else if (message.FromUserName === 'text') {
	////	//你也可以这样回复text类型的信息
	////	res.reply({
	////		content: 'text object',
	////		type: 'text'
	////	});
	////} else if (message.FromUserName === 'hehe') {
	////	// 回复一段音乐
	////	res.reply({
	////		type: "music",
	////		content: {
	////			title: "来段音乐吧",
	////			description: "一无所有",
	////			musicUrl: "http://mp3.com/xx.mp3",
	////			hqMusicUrl: "http://mp3.com/xx.mp3",
	////			thumbMediaId: "thisThumbMediaId"
	////		}
	////	});
	////}
	////else {
	////	res.reply([
	////	{
	////		title: '你来我家接我吧',
	////		description: '这是女神与高富帅之间的对话',
	////		picurl: 'http://nodeapi.cloudfoundry.com/qrcode.jpg',
	////		url: 'http://nodeapi.cloudfoundry.com/'
	////	}]);
	////}
}));

app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// error handlers
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
	app.use(function(err, req, res, next) {
		res.status(err.status || 500);
		res.render('error', {
			message: err.message,
			error: err
		});
	});
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
	res.status(err.status || 500);
	res.render('error', {
		message: err.message,
		error: {}
	});
});

module.exports = app;

