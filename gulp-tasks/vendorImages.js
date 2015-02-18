module.exports = function (gulp, plugins,config) {
    return function () {

        var target_dir = config.target_website_directory;
    var imagesFilter = plugins.filter(['**/*.png', '**/*.jpg', '**/*.gif', '**/*.jpeg']);
    gulp.src(['./bower_components/**/images/**', './bower_components/**/img/**'])
        .pipe(imagesFilter)
        .pipe(plugins.flatten())
        .pipe(gulp.dest(target_dir + '/images'));
    };
};
