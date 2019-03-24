var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Media Model
 * ==========
 */

var Media = new keystone.List('Media', {
	map: {
		name: 'title'
	},
	autokey: {
		path: 'slug',
		from: 'title',
		unique: true
	},
});

Media.add({
	title: {
		type: String,
		required: true,
		initial: true
    },
    url:{
        type: Types.Url,
        index: true
    },
	state: {
		type: Types.Select,
		options: 'Czytelnia, Dostepny, Wypozyczony',
		default: 'Dostepny',
		index: true
	},
	author: {
        type: String,
        index: true
	},
	Place: {
        type: String,
        index: true
	},
	Qty: {
        type: Number
	},
	
	publishedDate: {
		type: Types.Date,
		index: true,
		dependsOn: {
			state: 'Dostepny'
		}
	},
	image: {
		type: Types.CloudinaryImage
	},
	content: {
		brief: {
			type: Types.Html,
			wysiwyg: true,
			height: 150
		},
		extended: {
			type: Types.Html,
			wysiwyg: true,
			height: 400
		},
	}
});

Media.register();
