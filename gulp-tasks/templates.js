module.exports = function (gulp, plugins,config) {
    return function () {
        var target_dir = config.target_website_directory;
        //combine all template files of the app into a js file
        gulp.src(['!./app/index.html',
            './app/**/*.html'
        ])
            .pipe(plugins.debug({
                verbose: false
            }))
            .pipe(plugins.angularTemplatecache('templates.js', {
                standalone: true
            }))
            .pipe(gulp.dest(target_dir + '/js'));
    };
};
