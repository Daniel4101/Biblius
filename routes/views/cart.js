var keystone = require('keystone');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;
		locals.data = req.body;
	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.section = 'cart';

	var cartContents = {};
	keystone.session.cart.forEach((item) => {
		if (!cartContents[item._id]) {
			cartContents[item._id] = {
				id: item._id,
				name: item.title,
				quantity: 1,
				//imageUrl: item.image.url,
			};
		} else {
			cartContents[item._id].quantity++;
		}
	});
	res.locals.cartContents = cartContents;
	res.locals.isCartEmpty = keystone.session.cart.length === 0;
	console.log(res.locals.cartContents);
	console.log(res.locals.isCartEmpty);
	

	// Render the view
	view.render('cart');
};
