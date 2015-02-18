module.exports = function (gulp, plugins,config) {
    return function () {
        var target_dir = config.target_website_directory;

    //concatenate vendor JS files
    var jsFilter = plugins.filter(['*.js', '!*.min.js']);
    gulp.src(plugins.mainBowerFiles({
        "includeDev": true,
        "debugging": false
    }))
        .pipe(jsFilter)
        //  .pipe(plugins.debug({verbose: false}))
        .pipe(plugins.order(config.vendor_js_include_order))
      //  .pipe(plugins.debug({
      //      verbose: false})
        .pipe(plugins.concat('lib.js'))
        .pipe(gulp.dest(target_dir + '/js'));

};
    };
