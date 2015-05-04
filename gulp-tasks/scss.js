module.exports = function (gulp, plugins,config) {
    return function () {

        var target_dir = config.target_website_directory;
        //concatenate vendor CSS files
        gulp.src('./app/scss/*.scss')
        .pipe(plugins.debug({
          verbose: false
        }))
        .pipe(plugins.sass())
        .pipe(plugins.concat('compiled.css'))
        .pipe(gulp.dest(target_dir + '/css'));
    };
};
