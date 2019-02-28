var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Cart Model
 * ==========
 */
var Cart = new keystone.List('Cart', { nocreate: true, noedit: true });

Cart.add({
	products: { type: Types.Relationship, ref: 'Book', many: true, required: true, initial: true },
	totalQty: { type: Types.Number, initial: true, required: true, index: true },
});

/**
 * Registration
 */
Cart.defaultSort = '-createdAt';
Cart.defaultColumns = 'Book, totalQty';
Cart.register();
