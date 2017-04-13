"use strict";

// *** dom helper module START *** //
var dom = {

    hasClass: function (element, classString) {

        if (element.classList) {
            return element.classList.contains(classString);
        }

    },

    addClass: function (el, classString) {
        var classList = classString.split(' '),
            element = el;

        if (element.classList) {
            classList.forEach(function classLoop(currClass) {
                element.classList.add(currClass);
            });
        }
    },

    removeClass: function (el, classString) {
        var classList = classString.split(' '),
            element = el;

        if (element.classList) {
            classList.forEach(function classLoop(currClass) {
                element.classList.remove(currClass);
            });
        }
    },

    toggleClass: function (element, className, condition) {
        var add = typeof condition === 'boolean' ? condition : !dom.hasClass(element, className);

        if (add) {
            dom.addClass(element, className);
        } else {
            dom.removeClass(element, className);
        }
    },


    isVisible: function (el) {
        if (el) {
            return (el.offsetParent !== null);
        }
    },

    outerWidth: function (element, includeMargin) {
        var width = element.offsetWidth,
            style;

        if (!includeMargin) {
            return width;
        }

        style = getComputedStyle(element);
        width += parseInt(style.marginLeft, 10) + parseInt(style.marginRight, 10);

        return width;
    }

};
// *** dom helper module END *** //
