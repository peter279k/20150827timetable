var iconv = require('iconv-lite');
var request = require('request');
var wget = require('wget');
var http = require('http');
var fs = require('fs');
var options = {
    protocol: 'http',
    host: 'www.taiwanbus.tw',
    path: '/TimeTableExport/timetable.csv',
    method: 'GET'
};
/*request({ url: 'http://www.taiwanbus.tw/TimeTableExport/timetable.csv',encoding:null}, function(err, response, body) {
  if (!err && response.statusCode == 200) {
    var str = iconv.decode(new Buffer(body), "big5");
    console.log(str);
  }
});
*/

var server = http.createServer(function(req, res) {
	parse_file(res);
}).listen(process.env.PORT || 5000);

function parse_file(res) {
	var file = fs.readFile("timetable.csv", function(err, data) {
		if(err)
			throw err;
		else {
			var str = iconv.decode(new Buffer(data), "big5");
			res.writeHead(200, {"Content-Type": "text/plain; charset=utf8"});
			res.write("Hello World");
			res.end(str);
		}
	});
}

/*
var req = wget.request(options, function(res) {
		var html_str = "";
		if(res.statusCode === 200) {
			res.on('error', function(err) {
				console.log(err);
			});
			res.on('data', function(chunk) {
				var str = iconv.decode(new Buffer(chunk), "big5");
				html_str += str;
			});
			res.on('end', function() {
				console.log(html_str);
			});
		
		}
	});

	req.end();
	req.on('error', function(err) {
		console.log(err);
	});
*/