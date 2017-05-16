//helpers
import '../src/js/components/helpers/lazyload.min.js';
import '../src/js/components/helpers/hammer.min.js';

//styling
import css from '../src/scss/main.scss';

//components
import Gallery from '../src/js/components/gallery.js';

// ***** CREATE MY GALLERY ***** //
const gallery = new Gallery({
    wrapper: document.querySelector('.gallery__wrapper'),
    imagesNumber: 50,
    imagesUrl: 'https://unsplash.it/600/350?image=',
    touchEvents: true,
    autoPlay: true
    // clickable: false
    // autoBuild: false
});
