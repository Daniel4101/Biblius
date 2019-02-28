var keystone = require('keystone');
var Product = keystone.list('Book');

exports = module.exports = function (req, res) {
	var expressRes = res;
	// console.log(res);
	var productId = req.params._id;
	
	Product.model.findById(productId)
		.exec(function (err, product) {
			console.log(`Product ${productId} added to cart`);
			keystone.session.cart.push(product);
			if (product.Qty > 0 ){
				product.Qty--
				if(product.Qty ==0){
					product.state = 'Wypozyczony';
				}
				console.log(product.Qty)
				product.save();
			}
			else {
				req.flash('error', 'Nie ma już tej książki ');
			}
		})
		.then(function (arg) {
			expressRes.redirect('/books');
		});
};
