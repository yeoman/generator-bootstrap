'use strict';
var path = require('path');
var util = require('util');
var yeoman = require('yeoman-generator');


var Generator = module.exports = function Generator(args, options) {
  yeoman.generators.Base.apply(this, arguments);

  this.option('format', {
    desc: 'Select one of `css`, `sass`, `less`, `stylus` for the bootstrap format.',
    type: String
  });

  this.format = options.format;
};

util.inherits(Generator, yeoman.generators.Base);

Generator.prototype.askFor = function askFor(argument) {
  if (this.format) {
    // Skip if already set.
    return;
  }

  var cb = this.async();
  var formats = ['css', 'sass', 'less', 'stylus'];
  var prompts = [{
    name: 'format',
    message: 'In what format would you like the Twitter Bootstrap stylesheets?',
    default: formats.join('/')
  }];

  this.format = formats[0];

  this.prompt(prompts, function (err, props) {
    if (err) {
      return this.emit('error', err);
    }

    formats.forEach(function (opt) {
      if ((new RegExp(opt, 'i')).test(props.format)) {
        this.format = opt;
      }
    }, this);

    cb();
  }.bind(this));
};

Generator.prototype.bootstrapFiles = function bootstrapFiles() {
  // map format -> package name
  var packages = {
    css: 'bootstrap.css',
    sass: 'sass-bootstrap',
    less: 'bootstrap',
    stylus: 'bootstrap-stylus'
  };

  this.bowerInstall(packages[this.format], { save: true });
};
