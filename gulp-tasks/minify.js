module.exports = function (gulp, plugins,config) {
    return function () {

        var target_dir = config.target_website_directory;

    gulp.src(target_dir + '/index.html')
        .pipe(plugins.replace(/(\.js)/g, '.min.js'))
        .pipe(plugins.replace(/(\.css)/g, '.min.css'))
        .pipe(gulp.dest(target_dir));

    gulp.src(target_dir + '/js/*')
        .pipe(plugins.uglify())
        .pipe(plugins.rename({
            suffix: ".min"
        }))
        .pipe(gulp.dest(target_dir + '/js'));

    gulp.src(target_dir + '/css/*')
        .pipe(plugins.minifyCss())
        .pipe(plugins.rename({
            suffix: ".min"
        }))
        .pipe(gulp.dest(target_dir + '/css'));

};
    };
module.exports.dependencies = ['vendorJS', 'copy-index'];
