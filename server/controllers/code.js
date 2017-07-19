var PythonShell = require('python-shell');

exports.execute = function (req, res) {
	"use strict";

	console.log(req);

	// let options = {
	// 	scriptPath: 'api/code',
	// 	args: images_base64
	// };

	// PythonShell.run('router.py', options, function (err, results) {
	// 	if (err) {
	// 		reject(err);
	// 	}
	// 	else {
	// 		console.log('Recieved image from Python script!');
	// 		resolve(results[0]);
	// 	}
	// });
}