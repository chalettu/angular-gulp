module.exports = function (gulp, plugins,config) {
    return function () {
        var target_dir = config.target_website_directory;

        gulp.src(['!./app/**/*_test.js', './app/**/*.js'])
            .pipe(plugins.jshint())
            .pipe(plugins.jshint.reporter('default'))
            .pipe(plugins.concat('app.js'))
            .pipe(plugins.ngAnnotate())
            //       .pipe(plugins.uglify())
            .pipe(gulp.dest(target_dir + '/js'));
    };
};
