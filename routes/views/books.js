var keystone = require('keystone');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// Init locals
	locals.section = 'books';

	// Load the posts
	view.on('init', function (next) {

		var q = keystone.list('Book').model
			.find({
				state: 'Dostepny'
			})
			.populate('bookCategory');

		q.exec(function (err, results) {
			locals.books = results;
			next(err);
		});
	});

	// Render the view
	view.render('books');
};
