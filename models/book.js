var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Book Model
 * ==========
 */

var Book = new keystone.List('Book', {
	map: { name: 'title' },
	autokey: { path: 'slug', from: 'title', unique: true },
});

Book.add({
	title: { type: String, required: true, initial: true },
	state: { type: Types.Select, options: 'Czytelnia, Dostepny, Wypozyczony', default: 'Dostepny', index: true },
	author: { type: String },
	Place: { type: String },
	Qty: {type: Number},
	bookCategory: { type: Types.Relationship, ref:'bookCategory'},
	publishedDate: { type: Types.Date, index: true, dependsOn: { state: 'Dostepny' } },
	image: { type: Types.CloudinaryImage },
	content: {
		brief: { type: Types.Html, wysiwyg: true, height: 150 },
		extended: { type: Types.Html, wysiwyg: true, height: 400 },
	}
});

Book.register();
