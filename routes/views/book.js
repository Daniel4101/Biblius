var keystone = require('keystone');
var Book = keystone.list('Book');
exports = module.exports = function (req, res) {

    var view = new keystone.View(req, res);
    var locals = res.locals;

    // Init locals
    locals.section = 'Books';
    locals.filters = {
        book: req.params.book,
    };
    locals.data = {};
    view.on('init', function(next){
        var q = keystone.list('Book').model.findOne({
            slug: req.params.slug
        });
    q.exec(function(err,result){
        locals.data.book = result;
        next(err)
    });
});

view.render('book');
}