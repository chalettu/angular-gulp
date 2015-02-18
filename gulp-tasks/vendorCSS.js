module.exports = function (gulp, plugins,config) {
    return function () {

        var target_dir = config.target_website_directory;
        //concatenate vendor CSS files
        gulp.src(['!./bower_components/**/*.min.css',
            './bower_components/**/*.css'
        ])
            .pipe(plugins.concat('lib.css'))
            .pipe(gulp.dest(target_dir + '/css'));
    };
};
