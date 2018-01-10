'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Page = require('../components/Page');

var _Page2 = _interopRequireDefault(_Page);

var _isomorphicFetch = require('isomorphic-fetch');

var _isomorphicFetch2 = _interopRequireDefault(_isomorphicFetch);

var _link = require('next\\dist\\lib\\link.js');

var _link2 = _interopRequireDefault(_link);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Home = function (_Component) {
    (0, _inherits3.default)(Home, _Component);

    function Home() {
        (0, _classCallCheck3.default)(this, Home);

        return (0, _possibleConstructorReturn3.default)(this, (Home.__proto__ || (0, _getPrototypeOf2.default)(Home)).apply(this, arguments));
    }

    (0, _createClass3.default)(Home, [{
        key: 'render',
        value: function render() {
            var storiesData = this.props.storiesData; // const storiesData = this.props.storiesData

            return _react2.default.createElement(_Page2.default, null, _react2.default.createElement('h2', null, 'Best Stories'), _react2.default.createElement('ul', null, storiesData.map(function (story, index) {
                return _react2.default.createElement('li', { key: index }, story.title, ' - ', _react2.default.createElement(_link2.default, { href: { pathname: '/item', query: { id: story.id } } }, _react2.default.createElement('a', null, 'more!')));
            })));
        }
    }], [{
        key: 'getInitialProps',
        value: function () {
            var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
                var stories, jsonIDs, storiesData;
                return _regenerator2.default.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _context.next = 2;
                                return (0, _isomorphicFetch2.default)('https://hacker-news.firebaseio.com/v0/beststories.json');

                            case 2:
                                stories = _context.sent;
                                _context.next = 5;
                                return stories.json();

                            case 5:
                                jsonIDs = _context.sent;
                                _context.next = 8;
                                return _promise2.default.all(jsonIDs.slice(0, 20).map(function (id) {
                                    return (0, _isomorphicFetch2.default)('https://hacker-news.firebaseio.com/v0/item/' + id + '.json').then(function (res) {
                                        return res.json();
                                    });
                                }));

                            case 8:
                                storiesData = _context.sent;
                                return _context.abrupt('return', { storiesData: storiesData // {storiesData: storiesData}
                                });

                            case 10:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));

            function getInitialProps() {
                return _ref.apply(this, arguments);
            }

            return getInitialProps;
        }()
    }]);

    return Home;
}(_react.Component);

exports.default = Home;