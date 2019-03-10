var keystone = require('keystone');
var Order = keystone.list('Order');

exports = module.exports = function (req, res) {
	var firstName = req.user.name.first;
	var lastName = req.user.name.last;
	var email = req.user.email;
	var addressLine1 = req.body.addressLine1;
	var addressLine2 = req.body.addressLine2;
	var city = req.body.city;
	var zipcode = req.body.zipcode;
	var address = addressLine2 !== ''
								? `${addressLine1}, ${addressLine2}, ${city},  ${zipcode}`
								: `${addressLine1}, ${city},  ${zipcode}`;

	if (keystone.session.cart) {
		var a =0;
		keystone.session.cart.forEach((item) =>{
			a++
		var newOrder = new Order.model({
			name: { first: firstName, last: lastName },
			email: email,
			address: address,
			orderId: a,
			products: item.id,
			Qty: 1
			
		});
		var updater = newOrder.getUpdateHandler(req, res, {
			errorMessage: 'There was an error creating your order',
		});

		updater.process(req.body, {
			flashErrors: false,
			logErrors: true,
		}, function (err) {
			if (err) {
				console.error(err);
			} else {
				 newOrder.save();
				newOrder.orderId = newOrder._id;
				newOrder.save();
				keystone.session.cart = [];
				res.redirect('/');
			}
		});
	}
);
	}
	else {
		res.redirect('/');
	}
};
