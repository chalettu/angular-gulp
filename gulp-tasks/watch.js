module.exports = function (gulp, plugins,config) {
    return function () {

        var target_dir = config.target_website_directory;
    gulp.watch([
        'build/**/*.html',
        'build/**/*.js',
        'build/**/*.css'
    ], function(event) {
        return gulp.src(event.path)
        //     .pipe(plugins.connect.reload());
    });
    gulp.watch(['./app/**/*.js', '!./app/**/*test.js'], ['scripts']);
    gulp.watch(['!./app/index.html', './app/**/*.html'], ['templates']);
    gulp.watch('./app/**/*.css', ['css']);
    gulp.watch('./app/index.html', ['copy-index']);
    gulp.watch('./bower_components/**/*.js',['vendorJS']);
    gulp.watch('./bower_components/**/*.css',['vendorCSS']);
    };
};
