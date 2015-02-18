module.exports = function (gulp, plugins,config) {
    return function () {
        var target_dir = config.target_website_directory;
        gulp.src('./app/index.html')
            .pipe(gulp.dest(target_dir));
}
};
