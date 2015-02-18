/* To read the option from cmd line argument for environment setup */
/* eg :: gulp taskname --env environmentvalue */
module.exports = function (gulp, plugins,config) {
    return function () {

    var minimist = require('minimist');
    var knownOptions = {
        string: 'env',
        default: {
            env: process.env.NODE_ENV || 'production'
        }
    };
    var options = minimist(process.argv.slice(2), knownOptions);
    console.log(" Selected Environment : " + options.env);
        var selected_environment = {};
        var target_dir = config.target_website_directory;

    try {
        var environments = require('./app/config/environments.json');
        //check for the environment given at cmd line arguments
        for (i in environments) {
            var current_env = environments[i];
            if (current_env.NAME === options.env) {
                selected_environment = current_env;
                break;
            }
        }

        console.log(selected_environment);

        //if the selected_environment object is empty set the environment to a default env :: eg, "test" here
        if (Object.keys(selected_environment).length === 0) {
            selected_environment = environments[1]; //test
        }

    } catch (errorObj) {
        console.log("error in environment set up")
    }
    //writing environment object to environment.json file
    require('fs').writeFile(target_dir + '/js/environment.json', JSON.stringify(selected_environment));
    };
};
