module.exports = function (gulp, plugins,config) {
    return function () {
        var target_dir = config.target_website_directory;

        var fontFilter = plugins.filter(['**/*.eot', '**/*.woff', '**/*.svg', '**/*.ttf']);
        gulp.src('./bower_components/**/fonts/**')
            .pipe(fontFilter)
            .pipe(plugins.flatten())
            .pipe(gulp.dest(target_dir + '/fonts'));
    };
};
