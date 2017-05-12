'use strict';

import {dom} from './helpers/modules.js';

//// ***** GALLERY PLUGIN START ***** //
class Gallery {

// Define our constructor
    constructor() {

        // Create global element references
        this.nextButton = null;
        this.prevButton = null;
        this.swipeLeft = null;
        this.swipeRight = null;
        this.play = null;
        this.playButton = null;

        // Define option defaults
        let defaults = {
            wrapper: '',
            imagesNumber: 5,
            imagesUrl: '',
            autoBuild: true,
            autoPlay: false,
            delay: 3000,
            clickable: true,
            touchEvents: false,
            counter: 0
        };

        // Create options by extending defaults with the passed in arguments
        if (arguments[0] && typeof arguments[0] === 'object') {
            this.options = extendDefaults(defaults, arguments[0]);
        }

        // If auto play option is true
        if (this.options.autoPlay) {
            this.playButton = document.querySelector('.info__button');
            dom.removeClass(this.playButton, 'is-hidden');
            this.play = true;
            this.autoPlay();

        }

        // If clickable option is true
        if (this.options.clickable) {
            this.nextButton = document.querySelector('.gallery__button--next');
            this.prevButton = document.querySelector('.gallery__button--prev');
            dom.removeClass(this.nextButton, 'is-hidden');
            dom.removeClass(this.prevButton, 'is-hidden');

        }

        // If touchEvents option is true
        if (this.options.touchEvents) {
            this.swipeLeft = true;
            this.swipeRight = true;

            initializeEvents.call(this, 'touchEvents');
        }

        // If auto build option is true
        if (this.options.autoBuild) {
            initializeEvents.call(this, 'clickEvents');
            this.build();
            this.counter();
        }

    }

    build() {
        let i;

        for (i = 1; i <= this.options.imagesNumber; i++) {
            //instantiate the elements
            let lzldImage = 'https://kobe13.github.io/gallery/src/img/spinningwheel.gif',
                imageUrl = this.options.imagesUrl,
                wrapper = this.options.wrapper,
                wrapperClass = wrapper.classList[0],
                element = `<li class="gallery__element">
                                <img class="gallery__element__image" data-src="${imageUrl + i}" src="${lzldImage}" alt="Image-${i}" onload="lzld(this)">
                           </li>`;

            //append the li element to the gallery wrapper
            wrapper.insertAdjacentHTML('beforeend', element);

            // set the active class to the first element
            if (i === 1) {
                dom.addClass(document.querySelector('.' + wrapperClass + ' .gallery__element'), 'gallery__element--show');
            }

        }
    }

    counter() {
        let counterTotal = document.querySelector('.info__counter--total'),
            imagesNumber = this.options.imagesNumber;

        //update the counter with the total number of images
        counterTotal.innerHTML = (imagesNumber);
    }

    showCurrentImage() {
        let counterCurrent = document.querySelector('.info__counter--current'),
            counter = this.options.counter,
            images = document.querySelectorAll('.gallery__element'),
            imagesLength = images.length,
            imageToShow = Math.abs(counter % imagesLength),
            imageActive = document.querySelector('.gallery__element--show');

        //prevent going backward when counter < 0
        if (Math.sign(counter) === -1) {
            imageToShow = imagesLength - 1;
            this.options.counter = imagesLength - 1;
        }

        //add/remove the active class to the right image
        dom.removeClass(imageActive, 'gallery__element--show');
        dom.addClass(images[imageToShow], 'gallery__element--show');

        //update the counter with the current image number
        counterCurrent.innerHTML = (imageToShow + 1);

    }

    swipe(direction) {

        if (direction === 'next') {
            this.options.counter++;
        }

        if (direction === 'prev') {
            this.options.counter--;
        }

        this.showCurrentImage();

    }

    autoPlay() {
        let interval = this.options.delay,
            playOn = setInterval(() => {
                if (this.play) {
                    this.swipe.call(this, 'next');

                } else {
                    //if stopPlay() is called stop the autoplay
                    clearInterval(playOn);

                }
            }, interval);

    }

    stopPlay() {

        if (this.play) {
            this.play = null;
            this.playButton.innerHTML = 'PLAY';

        } else {
            this.play = true;
            this.playButton.innerHTML = 'STOP';
            this.autoPlay();

        }

    }

} 

// *****  Utility Methods ***** //

//extend defaults with user options
function extendDefaults(source, properties) {
    let property;

    for (property in properties) {
        if (properties.hasOwnProperty(property)) {
            source[property] = properties[property];
        }
    }

    return source;
}

// Initialize the events type
function initializeEvents(type) {

    // Click events
    if (type === 'clickEvents') {

        if (this.nextButton) {
            this.nextButton.addEventListener('click', () => this.swipe('next'));

        }

        if (this.prevButton) {
            this.prevButton.addEventListener('click', () => this.swipe('prev'));

        }

        if (this.playButton) {
            if (this.play) {
                this.playButton.addEventListener('click', () => this.stopPlay());
            }

            if (!this.play) {
                this.playButton.addEventListener('click', () => {
                    this.play = true;
                });

            }

        }

    }

    // Touch events
    if (type === 'touchEvents') {

        let hammertime = new Hammer(galleryWrapper);

        if (this.swipeRight) {
            hammertime.on('swiperight', () => this.swipe('prev'));

        }

        if (this.swipeLeft) {
            hammertime.on('swipeleft', () => this.swipe('next'));

        }
    }

}

// ***** CREATE MY GALLERY ***** //
let galleryWrapper = document.querySelector('.gallery__wrapper'),
    myImagesUrl = 'https://unsplash.it/600/350?image=';

export let gallery = new Gallery({
    wrapper: galleryWrapper,
    imagesNumber: 50,
    imagesUrl: myImagesUrl,
    touchEvents: true,
    autoPlay: true
    // clickable: false
    // autoBuild: false
});

