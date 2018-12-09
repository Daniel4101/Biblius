var keystone = require('keystone');
var async = require('async');
exports = module.exports = function (req, res) {
	if (req.user)
		return res.redirect('/');
	var view = new keystone.View(req, res);
	var locals = res.locals;
	locals.section = 'register';
	locals.form = req.body;
	view.on('post', function (next) {
		var data = req.body;
		var errors = [];
		async.series([
			function (cb) {
				if (!data.name)
					errors.push('nie podano imienia')
				if (!data.email)
					errors.push('nie podano adresu e-mail');
				if (data.email && !keystone.utils.isEmail(data.email))
					errors.push('Mail nie jest prawidłowy');
				if (!data.password)
					errors.push('nie podano hasła')
				if (data.password && data.password !== data.passwordAgain)
					errors.push('hasła nie sa takie same');
				errors.forEach(function (err) {
					req.flash('error', err);
				})
				if (errors.length) {
					return cb(true);
				}
				cb();
			},
			function (cb) {
				keystone.list('User').model.findOne({
					email: data.email
				}, function (error, user) {
					if (error || user) {
						req.flash('error', ' Ten Adres E-mail jest już zarejestrowany');
						return cb(true)
					}
					cb();
				})
			},
			function (cb) {
				var userData = {
					email: data.email,
					name: {
						first: data.name,
						last: data.surrname
					},
					password: data.password
				};
				var User = keystone.list('User').model,
					user = new User (userData);
				user.save(function (err) {
					cb(err);
				});
			}
		], function (err) {
			if (err) {
				return next();
			}
			keystone.session.signin({
				email: data.email,
				password: data.password
			}, req, res, function () {
				res.redirect('/');
			}, function () {
				req.flash('error', 'login successsful but error ocured');
				next();
			});
		});
	});
	view.render('register');
};
