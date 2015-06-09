# angular-gulp
This is the gulp workflow I have built for how I like my angular projects to be structured.  


How to use. 

1. Download this repo and unzip it in the root directory where your angular source code lives
2.  Open config.json and edit the following properties
    A) target_website_directory : this is where you want all the compiled source code to live
    B) server_port : which port number you want your site to listen on.
    C) Optional : vendor_js_include_order - this specifies the order of javascript files to include from the bower components directory.  Only important when certain files need to be loaded before others.