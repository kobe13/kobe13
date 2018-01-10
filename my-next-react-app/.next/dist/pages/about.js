'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Page = require('../components/Page');

var _Page2 = _interopRequireDefault(_Page);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var About = function About() {
    return _react2.default.createElement(_Page2.default, null, _react2.default.createElement('h2', null, 'About this site'), _react2.default.createElement('p', null, 'These are the news clone for learning purposes'));
};

exports.default = About;