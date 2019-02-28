var keystone = require('keystone');
exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;
	locals.section = 'books';


	view.on('init', function (next) {
		var regex = new RegExp(escapeRegex(req.query.name), 'gi');
		var q = keystone.list('Book').model
			.find({
				title: regex
			})
			.populate('bookCategory');

		q.exec(function (err, result) {
			locals.books = result;
			// console.log('Working!' + result);
			next(err);
		});
	});

	view.render('books');
}

function escapeRegex(text) {
	return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};
