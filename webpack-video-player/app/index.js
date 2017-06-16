import '../src/scss/main.scss';
import Video from '../src/js/video';
import { playersList } from '../src/js/helpers/player.class';

playersList.forEach(player => {
  const dataOptions = JSON.parse(player.getAttribute('data-player'));
  new Video(player, dataOptions);
});
