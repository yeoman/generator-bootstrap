/*global describe, beforeEach, it*/
'use strict';

var path    = require('path');
var helpers = require('yeoman-generator').test;
var assert  = require('assert');


describe('Bootstrap generator test', function () {
  beforeEach(function (done) {
    helpers.testDirectory(path.join(__dirname, 'temp'), function (err) {
      if (err) {
        return done(err);
      }

      this.webapp = helpers.createGenerator('bootstrap:app', [
        '../../app'
      ]);
      done();
    }.bind(this));
  });

  it('the generator can be required without throwing', function () {
    // not testing the actual run of generators yet
    this.app = require('../app');
  });

  it('creates expected files in compass mode', function (done) {
    var expected = [
      'app/styles/main.scss'
    ];

    helpers.mockPrompt(this.webapp, {
      'compassBootstrap': 'Y'
    });

    this.webapp.run({}, function () {
      helpers.assertFiles(expected);
      done();
    });
  });

  it('creates expected files in vanilla mode', function (done) {
    var expected = [
      'app/styles/bootstrap.css'
    ];

    helpers.mockPrompt(this.webapp, {
      'compassBootstrap': 'N'
    });

    this.webapp.run({}, function () {
      helpers.assertFiles(expected);
      done();
    });
  });
});
