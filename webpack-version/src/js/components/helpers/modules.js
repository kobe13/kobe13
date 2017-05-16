'use strict';

// *** dom helper module START *** //
export const dom = {

    addClass(el, classString) {
        const classList = classString.split(' '),
            element = el;

        if (element.classList) {
            classList.forEach(function classLoop(currClass) {
                element.classList.add(currClass);
            });
        }
    },
    removeClass(el, classString) {
        const classList = classString.split(' '),
            element = el;

        if (element.classList) {
            classList.forEach(function classLoop(currClass) {
                element.classList.remove(currClass);
            });
        }
    }

};
// *** dom helper module END *** //
