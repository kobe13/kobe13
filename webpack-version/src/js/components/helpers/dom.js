'use strict';

// *** dom helper module START *** //
export function addClass(el, classString) {
    const classList = classString.split(' '),
        element = el;

    if (element.classList) {
        classList.forEach(function classLoop(currClass) {
            element.classList.add(currClass);
        });
    }
}

export function removeClass(el, classString) {
    const classList = classString.split(' '),
        element = el;

    if (element.classList) {
        classList.forEach(function classLoop(currClass) {
            element.classList.remove(currClass);
        });
    }
}

// *** dom helper module END *** //
