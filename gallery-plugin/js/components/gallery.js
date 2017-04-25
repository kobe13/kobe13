'use strict';

//gallery plugin

// Define our constructor
var Gallery = function () {

    // Create global element references
    this.nextButton = null;
    this.prevButton = null;

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
        // touchEvents.call(this);
        this.touchEvents();
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

Gallery.prototype.swipeRight = function () {
    this.options.counter++;
    this.showCurrentImage();
};

Gallery.prototype.swipeLeft = function () {
    this.options.counter--;
    this.showCurrentImage();
};

// Gallery.prototype.handleTouchStart = function (evt) {
//
//     var xDown = null,
//         yDown = null;
//
//     xDown = evt.touches[0].clientX;
//     yDown = evt.touches[0].clientY;
// };
//
// Gallery.prototype.handleTouchMove = function (evt) {
//     // console.log(this.options.counter);
//
//     if (!xDown || !yDown) {
//         return;
//     }
//
//     var xUp = evt.touches[0].clientX;
//     var yUp = evt.touches[0].clientY;
//
//     var xDiff = xDown - xUp,
//         yDiff = yDown - yUp;
//
//     if (Math.abs(xDiff) > Math.abs(yDiff)) {
//         if (xDiff > 0) {
//             // left swipe
//             console.log(this.options.counter);
//
//         } else {
//             // right swipe
//             console.log(this.options.counter);
//         }
//     }
//
//     // reset values
//     xDown = null;
//     yDown = null;
// };


// ***** TOUCH EVENTS START ***** //
Gallery.prototype.touchEvents = function () {

    // document.addEventListener('touchstart', this.handleTouchStart.bind(this));
    // document.addEventListener('touchmove', this.handleTouchMove.bind(this))

    document.addEventListener('touchstart', handleTouchStart, false);
    document.addEventListener('touchmove', handleTouchMove, false);

    var xDown = null,
        yDown = null,
        counter = this.options.counter;

    function handleTouchStart(evt) {
        xDown = evt.touches[0].clientX;
        yDown = evt.touches[0].clientY;
    }

    function handleTouchMove(evt) {

        if (!xDown || !yDown) {
            return;
        }

        var xUp = evt.touches[0].clientX;
        var yUp = evt.touches[0].clientY;

        var xDiff = xDown - xUp,
            yDiff = yDown - yUp;

        if (Math.abs(xDiff) > Math.abs(yDiff)) {
            if (xDiff > 0) {
                // left swipe
                console.log('left');
                counter--;

            } else {
                // right swipe
                counter++;
                console.log('right');
            }
        }

        // reset values
        xDown = null;
        yDown = null;
    }
};
// ***** TOUCH EVENTS END ***** //


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
        this.nextButton.addEventListener('click', this.swipeRight.bind(this));
    }

    if (this.prevButton) {
        this.prevButton.addEventListener('click', this.swipeLeft.bind(this));
    }

}


var myGallery = new Gallery({
    wrapper: document.querySelector('.gallery__wrapper'),
    imagesNumber: 20,
    imagesUrl: 'https://unsplash.it/600/350?image=',
    touchEvents: true
    // clickable: false,
    // autoBuild: false
});


// var gallery = function () {
//     //init variables
//     var galleryWrapper = document.querySelector('.gallery__wrapper'),
//         imagesUrl = 'https://unsplash.it/600/350?image=',
//         buttonNext = document.querySelector('.gallery__button--next'),
//         buttonPrev = document.querySelector('.gallery__button--prev'),
//         counterCurrent = document.querySelector('.info__counter--current'),
//         counterTotal = document.querySelector('.info__counter--total'),
//         counter = 1000;
//
// // ***** GALLERY START ***** //
//     //adding the images to the gallery
// var buildGallery = function (imagesDisplayed) {
//     var i;
//
//     for (i = 1; i <= imagesDisplayed; i++) {
//         //instantiate the elements
//         var element = document.createElement("li"),
//             lzldImage = "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==",
//             image = document.createElement("img");
//
//         //set the active class to the first element
//         i === 1 ? element.className = "gallery__element gallery__element--show" : element.className = "gallery__element";
//
//         //set class, attributes to the image
//         image.className = "gallery__element__image";
//         image.setAttribute("data-src", imagesUrl + i);
//         image.setAttribute("src", lzldImage);
//         image.setAttribute("onload", "lzld(this)");
//         image.setAttribute("alt", "Image-" + i);
//
//         //append the image to the li element
//         element.appendChild(image);
//
//         //append the li element to the gallery wrapper
//         galleryWrapper.appendChild(element);
//     }
//
// };
//
//     //build the gallery with n images
//     buildGallery(10);
//
//     //calculate the number of images in the gallery
//     var images = document.querySelectorAll('.gallery__element'),
//         imagesLength = images.length;
//
//     //update the counter with the total number of images
//     counterTotal.innerHTML = (imagesLength);
//
//     //show current image
//     var showCurrentImage = function () {
//             var imageToShow = Math.abs(counter % imagesLength),
//                 imageActive = document.querySelector('.gallery__element--show');
//
//             dom.removeClass(imageActive, 'gallery__element--show');
//             dom.addClass(images[imageToShow], 'gallery__element--show');
//
//             //update the counter with the current image number
//             counterCurrent.innerHTML = (imageToShow + 1);
//         },
//         events = function (e) {
//             //create the image next and prev events
//             if (e === 'next') {
//                 counter++;
//                 showCurrentImage();
//             } else {
//                 counter--;
//                 showCurrentImage();
//             }
//         };
//
//     buttonNext.addEventListener('click', function () {
//         events('next');
//     });
//
//     buttonPrev.addEventListener('click', function () {
//         events('prev');
//     });
// // ***** GALLERY END ***** //
//
// // ***** TOUCH EVENTS START ***** //
//     var touchEvents = function () {
//
//         document.addEventListener('touchstart', handleTouchStart, false);
//         document.addEventListener('touchmove', handleTouchMove, false);
//
//         var xDown = null,
//             yDown = null;
//
//         function handleTouchStart(evt) {
//             xDown = evt.touches[0].clientX;
//             yDown = evt.touches[0].clientY;
//         }
//
//         function handleTouchMove(evt) {
//             if (!xDown || !yDown) {
//                 return;
//             }
//
//             var xUp = evt.touches[0].clientX;
//             var yUp = evt.touches[0].clientY;
//
//             var xDiff = xDown - xUp,
//                 yDiff = yDown - yUp;
//
//             if (Math.abs(xDiff) > Math.abs(yDiff)) {
//                 if (xDiff > 0) {
//                     // left swipe
//                     events('next');
//                 } else {
//                     // right swipe
//                     events('prev');
//                 }
//             }
//
//             // reset values
//             xDown = null;
//             yDown = null;
//         }
//     };
//
//     touchEvents();
// // ***** TOUCH EVENTS END ***** //
//
// };
//
// gallery();
