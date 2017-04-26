//// ***** GALLERY PLUGIN START ***** //
// Define our constructor
var Gallery = function () {

    // Create global element references
    this.nextButton = null;
    this.prevButton = null;
    this.swipeLeft = null;
    this.swipeRight = null;

    // Define option defaults
    var defaults = {
        wrapper: "",
        imagesNumber: 10,
        imagesUrl: "",
        autoBuild: true,
        clickable: true,
        touchEvents: false,
        counter: 1000
    };

    // Create options by extending defaults with the passed in arguments
    if (arguments[0] && typeof arguments[0] === "object") {
        this.options = extendDefaults(defaults, arguments[0]);

    }

    // If auto build option is true
    if (this.options.autoBuild) {
        this.build();
        this.counter();
    }


    // If clickable option is true
    if (this.options.clickable) {
        this.nextButton = document.querySelector('.gallery__button--next');
        this.prevButton = document.querySelector('.gallery__button--prev');
        dom.removeClass(this.nextButton, 'is-hidden');
        dom.removeClass(this.prevButton, 'is-hidden');

        initializeEvents.call(this);
    }

    // If touchEvents option is true
    if (this.options.touchEvents) {
        this.swipeLeft = true;
        this.swipeRight = true;

        touchEvents.call(this);

    }

};

Gallery.prototype.build = function () {
    var i;

    for (i = 1; i <= this.options.imagesNumber; i++) {
        //instantiate the elements
        var element = document.createElement("li"),
            lzldImage = "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==",
            image = document.createElement("img");

        //set the active class to the first element
        i === 1 ? element.className = "gallery__element gallery__element--show" : element.className = "gallery__element";

        //set class, attributes to the image
        image.className = "gallery__element__image";
        image.setAttribute("data-src", this.options.imagesUrl + i);
        image.setAttribute("src", lzldImage);
        image.setAttribute("onload", "lzld(this)");
        image.setAttribute("alt", "Image-" + i);

        //append the image to the li element
        element.appendChild(image);

        //append the li element to the gallery wrapper
        this.options.wrapper.appendChild(element);
    }
};

Gallery.prototype.counter = function () {
    var counterTotal = document.querySelector('.info__counter--total');

    //update the counter with the total number of images
    counterTotal.innerHTML = (this.options.imagesNumber);
};

Gallery.prototype.showCurrentImage = function () {
    var counterCurrent = document.querySelector('.info__counter--current'),
        images = document.querySelectorAll('.gallery__element'),
        imagesLength = images.length,
        imageToShow = Math.abs(this.options.counter % imagesLength),
        imageActive = document.querySelector('.gallery__element--show');

    dom.removeClass(imageActive, 'gallery__element--show');
    dom.addClass(images[imageToShow], 'gallery__element--show');

    //update the counter with the current image number
    counterCurrent.innerHTML = (imageToShow + 1);

};

Gallery.prototype.swipeNext = function () {
    this.options.counter++;
    this.showCurrentImage();
};

Gallery.prototype.swipePrev = function () {
    this.options.counter--;
    this.showCurrentImage();
};

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

function initializeEvents() {

    if (this.nextButton) {
        this.nextButton.addEventListener('click', this.swipeNext.bind(this));
    }

    if (this.prevButton) {
        this.prevButton.addEventListener('click', this.swipePrev.bind(this));
    }

}

// ***** TOUCH EVENTS START ***** //
function touchEvents() {
    var hammertime = new Hammer(galleryWrapper);
    if (this.swipeRight) {
        hammertime.on('swiperight', this.swipePrev.bind(this));
    }

    if (this.swipeLeft) {
        hammertime.on('swipeleft', this.swipeNext.bind(this));
    }
}


// ***** CREATE MY GALLERY ***** //
var galleryWrapper = document.querySelector('.gallery__wrapper'),
    myImagesUrl = 'https://unsplash.it/600/350?image=';

var myGallery = new Gallery({
    wrapper: galleryWrapper,
    imagesNumber: 20,
    imagesUrl: myImagesUrl,
    touchEvents: true
    // clickable: false,
    // autoBuild: false
});
