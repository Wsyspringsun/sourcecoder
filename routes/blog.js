var express = require('express');
var fs = require('fs');
var path = require('path');
var router = express.Router();

/* GET users listing. */
var data = {
    nearly: [],
    popular: [],
    private: []
};
data.nearly.push({
    title: 'Go语言环境搭建',
    good: 4,
    comment: ['Good ', 'help', 'useful'],
    url: 'go.json'
});
data.popular.push({
    title: 'Go语言环境搭建',
    good: 4,
    comment: ['Good ', 'help', 'useful'],
    url: 'go.json'
});
data.private.push({
    title: 'Go语言环境搭建',
    good: 4,
    comment: ['Good ', 'help', 'useful'],
    url: 'go.json'
});

router.get('/', function(req, res, next) {
	res.render('blog/index', data);
});
router.get('/:id', function(req, res, next) {
    var id = req.params.id;
    var rootDir = req.app.get('rootDir');
    var dataPath = path.join(rootDir,'/data/blogs/'+id+'.json');
    fs.readFile(dataPath,'utf8',function(err,data){
        if(err) throw err;
        res.json(data);
    });
});

module.exports = router;

