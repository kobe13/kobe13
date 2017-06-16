const flowplayer = require('flowplayer');

export default class Video {

  constructor(videoWrapper, options) {
    this.options = options;

    const defaultOptions = {
      ratio: true,
      noPreload: true, //don't preload the video (if set to true then the autoplay won't work)
      autoPlay: false,
      videoUrl: 'https://www.w3schools.com/html/mov_bbb',
      videoTitle: 'Demo Video',
      posterUrl: 'https://image.flaticon.com/icons/svg/23/23957.svg',
      loop: false,
      muted: true
    };

    //merge default and data attribute video options
    this.options = Object.assign({}, defaultOptions, this.options);

    // install flowplayer into selected container
    flowplayer(videoWrapper, {
      adaptiveRatio: this.options.ratio,
      splash: this.options.noPreload,
      autoplay: this.options.autoPlay,
      poster: this.options.posterUrl,
      muted: this.options.muted,
      clip: {
        sources: [
          {
            type: 'video/webm',
            src: `${this.options.videoUrl}.webm`
          },
          {
            type: 'video/mp4',
            src: `${this.options.videoUrl}.mp4`
          }
        ],
        title: this.options.videoTitle,
        loop: this.options.loop
      }
    });

  }

}
