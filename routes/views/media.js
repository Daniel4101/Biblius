var keystone = require('keystone');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// Init locals
	locals.section = 'Media';

	// Load the posts
	view.on('init', function (next) {

		var q = keystone.list('Media').model
			.find({
				state: 'Dostepny'
			})

		q.exec(function (err, results) {
			locals.media = results;
			next(err);
		});
	});

	// Render the view
	view.render('media');
};
