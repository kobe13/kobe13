'use strict';

var gallery = function () {
    //init variables
    var galleryWrapper = document.querySelector('.gallery__wrapper'),
        imagesUrl = 'http://lorempixel.com/600/350/?',
        buttonNext = document.querySelector('.gallery__button--next'),
        buttonPrev = document.querySelector('.gallery__button--prev'),
        counterCurrent = document.querySelector('.info__counter--current'),
        counterTotal = document.querySelector('.info__counter--total'),
        counter = 0;

// ***** GALLERY START ***** //
    //adding the images to the gallery
    var buildGallery = function (imagesDisplayed) {
        var n = 0;

        while (n < imagesDisplayed) {
            //instantiate the elements
            var item = document.createElement("li"),
                image = document.createElement("img");

            //increment the elements
            n++;

            //set the active class to the first element
            if (n == 1) {
                item.className = "gallery__article gallery__article--show";
            } else {
                item.className = "gallery__article";
            }

            //set class, attributes to the image
            image.className = "gallery__image";
            image.setAttribute("src", imagesUrl + n);
            image.setAttribute("alt", "Image-" + n);

            //append the image to the li element
            item.appendChild(image);

            //append the element to the gallery wrapper
            galleryWrapper.appendChild(item);

        }

    };

    //build the gallery with n images
    buildGallery(5);

    //calculate the number of images in the gallery
    var images = document.querySelectorAll('.gallery__article'),
        imagesLength = images.length;

    //update the counter with the total number of images
    counterTotal.innerHTML = (imagesLength);

    //show current image
    var showCurrentImage = function () {
            var imageToShow = Math.abs(counter % imagesLength),
                imageActive = document.querySelector('.gallery__article--show');

            dom.removeClass(imageActive, 'gallery__article--show');
            dom.addClass(images[imageToShow], 'gallery__article--show');

            //update the counter with the current image number
            counterCurrent.innerHTML = (imageToShow + 1);
        },
        events = function (e) { //create the image next and prev events
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

};

gallery();
