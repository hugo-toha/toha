import Plyr from 'plyr';
import { videoplayer } from '@params';

const { plyr: options } = videoplayer;
window.addEventListener('DOMContentLoaded', () => Plyr.setup('.js-player', options));
