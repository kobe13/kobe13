"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _style = require("styled-jsx\\style.js");

var _style2 = _interopRequireDefault(_style);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Page = function Page(_ref) {
    var children = _ref.children;
    return _react2.default.createElement("div", null, _react2.default.createElement("h1", null, "Hacker News"), children, _react2.default.createElement("p", {
        className: "jsx-1745752929"
    }, "All rights reserved", _react2.default.createElement(_style2.default, {
        styleId: "1745752929",
        css: [".jsx-1745752929{font-size:small;}"]
    })));
};

exports.default = Page;