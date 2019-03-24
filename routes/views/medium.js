var keystone = require('keystone');
var Book = keystone.list('Media');
exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// Init locals
	locals.section = 'media';
	locals.filters = {
		medium: req.params.medium,
	};
	locals.data = {};
	view.on('init', function (next) {
		var q = keystone.list('Media').model.findOne({
			slug: req.params.slug
		});
		q.exec(function (err, result) {
			locals.data.medium = result;
			next(err)
		});

	});

	view.render('medium');
}