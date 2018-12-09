var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * bookCategory Model
 * ==========
 */
var bookCategory = new keystone.List('bookCategory',{
    autokey:{from: 'name', path: 'key',unique: true}
});

bookCategory.add({
	name: { type: String, required: true}
});
bookCategory.relationship({
    ref:'Book', path: 'categories'
})

/**
 * Registration
 */

bookCategory.register();
