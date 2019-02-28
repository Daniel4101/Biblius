var keystone = require('keystone');
var Product = keystone.list('Book');

exports = module.exports = function (req, res) {
	var productId = req.params._id;
	for (var i = 0; i < keystone.session.cart.length; i++) {
		if (keystone.session.cart[i].id === productId) {
			keystone.session.cart.splice(i, 1);
			break;
		}
	}
	console.log('afrte splice: ' +keystone.session.cart);
	console.log('length after splice '+ keystone.session.cart.length);
	res.redirect('/cart');
};
