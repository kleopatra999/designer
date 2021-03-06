var __ = require('lodash')
  , lessOpts = require('./less-options')
  , lessPath = '../public/javascripts/less'
  , LessCompiler;

exports.LessCompiler = LessCompiler = (function(){
  function LessCompiler(version, options) {
    this.version = version || __.find(lessOpts.lessVersions, function(version) {
      return version.type === 'current';
    });
    this.options = options || lessOpts.lessOptions;
    this.setupVersions(lessOpts.lessVersions);
  }

  LessCompiler.prototype = {
    setupVersions: function(versions) {
      var len = versions.length
        , i = 0;

      this.versions = [];

      while(i < len) {
        var version = versions[i]
          , obj = {}
          , sub = version.type === 'pre' ? version.label.replace(/[\d\.]+\s\(([\w\d-]+)\)/i, '-$1') : ''
          , fileName = 'less-' + version.number + sub;

          obj.version = version.number;
          obj.less = require(lessPath + "/" + fileName);
          // File still WIP
          this.versions.push(obj);
        i++;
      }
    }

    , compile: function(version, options) {}
  };

  return LessCompiler;
}());