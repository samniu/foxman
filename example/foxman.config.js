'use strict';
const path = require('path');
const mcss = require('foxman-mcss');
const autoprefix = require('gulp-autoprefixer');
const root = path.resolve(__dirname, 'src', 'main', 'webapp');
const routers = require('./route')

module.exports = {
    root,
    plugins: [
    ],
    // nei:{
    //   configPath: path.resolve( __dirname, 'nei.xxx.xxx/server.config'),
    //   mockTpl: 'backend/template/mock',
    //   mockApi: 'backend/src/mock'
    // },
    preCompilers: [{
      test: ['src/mcss/**/*.mcss'],
      /** exclude: ['src\/mcss\/_config.mcss],**/
      handler: (dest) => [
        mcss({
            // "include": [],
            // "exclude": "(\\\\|\\/)_",
            "format": 1
        }),
        autoprefix({
            browsers: ['Android >= 2.3'],
            cascade: false
        }),
        dest('src/css')
      ]
    }],
    watch: {},
    server: {
      routers,
      port: 5000,
      tpl: {
        extension: 'ftl',
        /** renderUtil: null **/
      },
      proxy: {
        test1: ( url ) => {
          let devMark = 'isDev=1000';
          let result = (-1===url.indexOf('?')?`?${devMark}`:`&${devMark}`);
          return 'http://10.240.178.181:90/' + url.replace(/^\//,'') + result;
        }
      },
      syncData: path.resolve(__dirname,'mock/fakeData'),
      viewRoot: 'WEB-INF',
      asyncData: path.resolve(__dirname,'mock/json'),
      static: [ 'src' ]
    }
};
