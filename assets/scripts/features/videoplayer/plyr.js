import Plyr from 'plyr'
import * as params from '@params'

const options = params.videoplayer?.plyr
window.addEventListener('DOMContentLoaded', () => Plyr.setup('.video-player', options))
