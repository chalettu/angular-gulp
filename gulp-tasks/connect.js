module.exports = function (gulp, plugins,config) {
    return function () {
        var target_dir = config.target_website_directory;
        gulp.src(target_dir)
            .pipe(plugins.webserver({
                livereload: true,
                directoryListing: false,
                defaultFile: "/index.html#",
                open: true,
                log: "debug",
                port: config.server_port
            }));
        console.log("Server started on port " + config.server_port);
    }
};
