'use strict';

// *** dom helper module START *** //
class Dom {

    addClass(el, classString) {
        var classList = classString.split(' '),
            element = el;

        if (element.classList) {
            classList.forEach(function classLoop(currClass) {
                element.classList.add(currClass);
            });
        }
    }

    removeClass(el, classString) {
        var classList = classString.split(' '),
            element = el;

        if (element.classList) {
            classList.forEach(function classLoop(currClass) {
                element.classList.remove(currClass);
            });
        }
    }

}
// *** dom helper module END *** //
export let dom = new Dom();
