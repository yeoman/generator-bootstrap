'use strict';
var path = require('path');
var util = require('util');
var yeoman = require('yeoman-generator');


var Generator = module.exports = function Generator() {
  yeoman.generators.Base.apply(this, arguments);
};

util.inherits(Generator, yeoman.generators.Base);

Generator.prototype.askFor = function askFor(argument) {
  var cb = this.async();

  var prompts = [{
    name: 'compassBootstrap',
    message: 'Would you like to use Twitter Bootstrap for Compass (as opposed to vanilla CSS)?',
    default: 'Y/n',
    warning: 'Yes: All Twitter Bootstrap files will be placed into the styles directory.'
  }];

  this.bootstrapType = 'vanilla';

  this.prompt(prompts, function(err, props) {
    if (err) {
      return this.emit('error', err);
    }

    if ( (/y/i).test(props.compassBootstrap) ) {
      this.bootstrapType = 'compass';
    }

    cb();
  }.bind(this));
};

Generator.prototype.bootstrapFiles = function bootstrapFiles() {
  if (this.bootstrapType === 'compass') {
    var cb = this.async();

    this.write('app/styles/main.scss', '@import "compass_twitter_bootstrap";');
    this.remote('kristianmandrup', 'compass-twitter-bootstrap', 'c3ccce2cca5ec52437925e8feaaa11fead51e132', function (err, remote) {
      if (err) {
        return cb(err);
      }
      remote.directory('stylesheets', 'app/styles');
      cb();
    });
  } else if (this.bootstrapType) {
    this.log.writeln('Writing vanilla Bootstrap');
    this.copy( 'bootstrap.css', 'app/styles/bootstrap.css' );
    this.directory( 'images', 'app/images' );
  }

};
