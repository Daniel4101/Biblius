var keystone = require('keystone');
exports = module.exports = function (req, res) {

    var view = new keystone.View(req, res);
    var locals = res.locals;

    // Init locals
    locals.section = 'Books';
    locals.filters = {
        book: req.params.book,
    };
    locals.data = {
        books: [],
        bookCategory: [],
    };
    view.on('init', function(next){
        var q = keystone.list('Book').model.findOne({
            slug: locals.filters.book
        });
    q.exec(function(err,result){
        locals.data.book = result;
        next(err)
    });   
});

view.render('book');
}