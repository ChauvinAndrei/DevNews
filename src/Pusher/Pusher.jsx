import Pusher from 'pusher-js';

const pusher = new Pusher('b1e011b4b466cc80bc9b', {
  cluster: 'eu'
});

export default pusher;