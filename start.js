    require("babel-register")({
        'presets': ["env", 'stage-3'],
    });
    
    require('babel-polyfill');
    
    require('./server');