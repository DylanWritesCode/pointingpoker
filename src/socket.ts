import { reactive } from "vue";
import { io } from "socket.io-client";

export const state = reactive({
  connected: false,
  fooEvents: [],
  barEvents: []
});

// "undefined" means the URL will be computed from the `window.location` object
//const URL = "http://localhost:3000";

const sockethost = import.meta.env.VITE_WEBSOCKET_HOST;
const port = import.meta.env.VITE_WEBSOCKET_PORT;
const protocol = import.meta.env.VITE_WEBSOCKET_PROTOCOL;

const URL = `${protocol}://${sockethost}${port ? `:${port}` : ''}`

export const socket = io(URL);

socket.on("connect", () => {
  state.connected = true;
});

socket.on("disconnect", () => {
  state.connected = false;
});
