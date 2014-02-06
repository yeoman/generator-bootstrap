/*global describe, beforeEach, it*/
'use strict';
var path = require('path');
var helpers = require('yeoman-generator').test;
var assert = require('assert');


describe('Bootstrap generator test', function () {
  beforeEach(function (done) {
    this.bowerInstallCalls = [];

    helpers.testDirectory(path.join(__dirname, 'temp'), function (err) {
      if (err) {
        return done(err);
      }

      this.app = helpers.createGenerator('bootstrap:app', [
        '../../app'
      ]);

      // Mock bower install and track the function calls.
      this.app.bowerInstall = function () {
        this.bowerInstallCalls.push(arguments);
      }.bind(this);

      done();
    }.bind(this));
  });

  it('the generator can be required without throwing', function () {
    // not testing the actual run of generators yet
    this.app = require('../app');
  });

  it('installs bootstrap.css', function (done) {
    helpers.mockPrompt(this.app, {
      format: 'css'
    });

    this.app.run({}, function () {
      assert.equal(this.bowerInstallCalls[0][0], 'bootstrap.css');
      done();
    }.bind(this));
  });

  it('installs sass-bootstrap', function (done) {
    helpers.mockPrompt(this.app, {
      format: 'sass'
    });

    this.app.run({}, function () {
      assert.equal(this.bowerInstallCalls[0][0], 'bootstrap-sass');
      done();
    }.bind(this));
  });

  it('installs bootstrap', function (done) {
    helpers.mockPrompt(this.app, {
      format: 'less'
    });

    this.app.run({}, function () {
      assert.equal(this.bowerInstallCalls[0][0], 'components-bootstrap');
      done();
    }.bind(this));
  });

  it('installs bootstrap-stylus', function (done) {
    helpers.mockPrompt(this.app, {
      format: 'stylus'
    });

    this.app.run({}, function () {
      assert.equal(this.bowerInstallCalls[0][0], 'bootstrap-stylus');
      done();
    }.bind(this));
  });
});
