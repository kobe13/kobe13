import './main.scss';
import Video from './video';
import {playersList} from '../src/js/helpers/player.class';

playersList.forEach(player => {
  const dataOptions = JSON.parse(player.getAttribute('data-player'));
  new Video(player, dataOptions);
});
