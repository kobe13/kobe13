'use strict';

// *** dom helper module START *** //
var dom = {

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
    }

};
// *** dom helper module END *** //

