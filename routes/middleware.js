/**
 * This file contains the common middleware used by your routes.
 *
 * Extend or replace these functions as your application requires.
 *
 * This structure is not enforced, and just a starting point. If
 * you have more middleware you may want to group it as separate
 * modules in your project's /lib directory.
 */
var _ = require('lodash');
var keystone = require('keystone');

/**
	Initialises the standard view locals

	The included layout depends on the navLinks array to generate
	the navigation in the header, you may wish to change this array
	or replace it with your own templates / logic.
*/
exports.initLocals = function (req, res, next) {
	res.locals.navLinks = [
		{ label: 'Home', key: 'home', href: '/' },
		{ label: 'Blog', key: 'blog', href: '/blog' },
		{ label: 'Gallery', key: 'gallery', href: '/gallery' },
		{ label: 'Contact', key: 'contact', href: '/contact' },
		{ label: 'Books', key: 'books', href: '/books' },
		{ label: 'Register', key: 'register', href: '/register' },
		{ label: 'Login', key: 'login', href: '/login' },
	];
	res.locals.user = req.user;
	if (!keystone.session.cart) {
		keystone.session.cart = [];
	}
	// Calculate total quantity and price of items in cart
	var cartTotalQty = 0;
	keystone.session.cart.forEach((item) => {
		cartTotalQty += 1;
	});
	res.locals.cartTotalQty = cartTotalQty;
	next();
};

/**
	Fetches and clears the flashMessages before a view is rendered
*/
exports.flashMessages = function (req, res, next) {
	var flashMessages = {
		info: req.flash('info'),
		success: req.flash('success'),
		warning: req.flash('warning'),
		error: req.flash('error'),
	};
	res.locals.messages = _.some(flashMessages, function (msgs) { return msgs.length; }) ? flashMessages : false;
	next();
};


/**
	Prevents people from accessing protected pages when they're not signed in
 */
exports.requireUser = function (req, res, next) {
	if (!req.user) {
		req.flash('error', 'Please sign in to access this page.');
		res.redirect('/keystone/signin');
	} else {
		next();
	}
};
