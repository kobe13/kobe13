'use strict';

//// ***** GALLERY PLUGIN START ***** //
(function () {

// Define our constructor
    this.Gallery = function () {

        // Create global element references
        this.nextButton = null;
        this.prevButton = null;
        this.swipeLeft = null;
        this.swipeRight = null;
        this.play = null;
        this.playButton = null;

        // Define option defaults
        var defaults = {
            wrapper: "",
            imagesNumber: 5,
            imagesUrl: "",
            autoBuild: true,
            autoPlay: false,
            delay: 3000,
            clickable: true,
            touchEvents: false,
            counter: 0
        };

        // Create options by extending defaults with the passed in arguments
        if (arguments[0] && typeof arguments[0] === "object") {
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

    };


// *****  Public Methods ***** //

    Gallery.prototype.build = function () {
        var i;

        for (i = 1; i <= this.options.imagesNumber; i++) {
            //instantiate the elements
            var element = document.createElement("li"),
                lzldImage = "https://kobe13.github.io/gallery/src/img/spinningwheel.gif",
                image = document.createElement("img"),
                imageUrl = this.options.imagesUrl,
                wrapper = this.options.wrapper;

            //set the active class to the first element
            i === 1 ? element.className = "gallery__element gallery__element--show" : element.className = "gallery__element";

            //set class, attributes to the image
            image.className = "gallery__element__image";
            image.setAttribute("data-src", imageUrl + i);
            image.setAttribute("src", lzldImage);
            image.setAttribute("onload", "lzld(this)");
            image.setAttribute("alt", "Image-" + i);

            //append the image to the li element
            element.appendChild(image);

            //append the li element to the gallery wrapper
            wrapper.appendChild(element);
        }
    };

    Gallery.prototype.counter = function () {
        var counterTotal = document.querySelector('.info__counter--total'),
            imagesNumber = this.options.imagesNumber;

        //update the counter with the total number of images
        counterTotal.innerHTML = (imagesNumber);
    };

    Gallery.prototype.showCurrentImage = function () {
        var counterCurrent = document.querySelector('.info__counter--current'),
            counter = this.options.counter,
            images = document.querySelectorAll('.gallery__element'),
            imagesLength = images.length,
            imageToShow = Math.abs(counter % imagesLength),
            imageActive = document.querySelector('.gallery__element--show');

        //prevent going backward when counter < 0
        if (counter === -1) {
            imageToShow = imagesLength - 1;
            this.options.counter = imagesLength - 1;
        }

        //add/remove the active class to the right image
        dom.removeClass(imageActive, 'gallery__element--show');
        dom.addClass(images[imageToShow], 'gallery__element--show');

        //update the counter with the current image number
        counterCurrent.innerHTML = (imageToShow + 1);

    };

    Gallery.prototype.swipe = function (direction) {

        if (direction === 'next') {
            this.options.counter++;
        }

        if (direction === 'prev') {
            this.options.counter--;
        }

        this.showCurrentImage();

    };

    Gallery.prototype.autoPlay = function () {
        var _ = this,
            interval = this.options.delay,
            playOn = setInterval(function () {
                if (_.play) {
                    _.swipe.call(_, 'next');

                } else {
                    //if stopPlay() is called stop the autoplay
                    clearInterval(playOn);

                }
            }, interval);

    };

    Gallery.prototype.stopPlay = function () {

        if (this.play) {
            this.play = null;
            this.playButton.innerHTML = "PLAY";

        } else {
            this.play = true;
            this.playButton.innerHTML = "STOP";
            this.autoPlay();

        }

    };

// *****  Private Methods ***** //

    // Utility method to extend defaults with user options
    function extendDefaults(source, properties) {
        var property;

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
                this.nextButton.addEventListener('click', this.swipe.bind(this, 'next'));

            }

            if (this.prevButton) {
                this.prevButton.addEventListener('click', this.swipe.bind(this, 'prev'));

            }

            if (this.playButton) {
                if (this.play) {
                    this.playButton.addEventListener('click', this.stopPlay.bind(this));
                }

                if (!this.play) {
                    this.playButton.addEventListener('click', function () {
                        var _ = this;
                        _.play = true;
                    });

                }

            }

        }

        // Touch events
        if (type === 'touchEvents') {

            var hammertime = new Hammer(galleryWrapper);

            if (this.swipeRight) {
                hammertime.on('swiperight', this.swipe.bind(this, 'prev'));

            }

            if (this.swipeLeft) {
                hammertime.on('swipeleft', this.swipe.bind(this, 'next'));

            }
        }

    }

}());

// ***** CREATE MY GALLERY ***** //
var galleryWrapper = document.querySelector('.gallery__wrapper'),
    myImagesUrl = 'https://unsplash.it/600/350?image=';

var myGallery = new Gallery({
    wrapper: galleryWrapper,
    imagesNumber: 50,
    imagesUrl: myImagesUrl,
    touchEvents: true,
    autoPlay: true
    // clickable: false
    // autoBuild: false
});