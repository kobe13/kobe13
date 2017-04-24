'use strict';

var gallery = function () {
    //init variables
    var galleryWrapper = document.querySelector('.gallery__wrapper'),
        imagesUrl = 'https://unsplash.it/600/350?image=',
        buttonNext = document.querySelector('.gallery__button--next'),
        buttonPrev = document.querySelector('.gallery__button--prev'),
        counterCurrent = document.querySelector('.info__counter--current'),
        counterTotal = document.querySelector('.info__counter--total'),
        counter = 1000;

// ***** GALLERY START ***** //
    //adding the images to the gallery
    var buildGallery = function (imagesDisplayed) {
        var n;

        for (n = 0; n < imagesDisplayed; n++) {
            //instantiate the elements
            var element = document.createElement("li"),
                lzldImage = "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==",
                image = document.createElement("img");

            //set the active class to the first element
            n == 0 ? element.className = "gallery__element gallery__element--show" : element.className = "gallery__element";

            //set class, attributes to the image
            image.className = "gallery__element__image";
            image.setAttribute("data-src", imagesUrl + n);
            image.setAttribute("src", lzldImage);
            image.setAttribute("onload", "lzld(this)");
            image.setAttribute("alt", "Image-" + n);

            //append the image to the li element
            element.appendChild(image);

            //append the li element to the gallery wrapper
            galleryWrapper.appendChild(element);
        }

    };

    //build the gallery with n images
    buildGallery(10);

    //calculate the number of images in the gallery
    var images = document.querySelectorAll('.gallery__element'),
        imagesLength = images.length;

    //update the counter with the total number of images
    counterTotal.innerHTML = (imagesLength);

    //show current image
    var showCurrentImage = function () {
            var imageToShow = Math.abs(counter % imagesLength),
                imageActive = document.querySelector('.gallery__element--show');

            dom.removeClass(imageActive, 'gallery__element--show');
            dom.addClass(images[imageToShow], 'gallery__element--show');

            //update the counter with the current image number
            counterCurrent.innerHTML = (imageToShow + 1);
        },
        events = function (e) {
            //create the image next and prev events
            if (e === 'next') {
                counter++;
                showCurrentImage();
            } else {
                counter--;
                showCurrentImage();
            }
        };

    buttonNext.addEventListener('click', function () {
        events('next');
    });

    buttonPrev.addEventListener('click', function () {
        events('prev');
    });
// ***** GALLERY END ***** //

// ***** TOUCH EVENTS START ***** //
    var touchEvents = function () {

        document.addEventListener('touchstart', handleTouchStart, false);
        document.addEventListener('touchmove', handleTouchMove, false);

        var xDown = null,
            yDown = null;

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
                    events('next');
                } else {
                    // right swipe
                    events('prev');
                }
            }

            // reset values
            xDown = null;
            yDown = null;
        }
    };

    touchEvents();
// ***** TOUCH EVENTS END ***** //

};

gallery();
