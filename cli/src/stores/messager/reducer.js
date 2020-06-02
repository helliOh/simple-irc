import { actions } from './action'

const initialState = {
  socket : null,
  room : null,
  messages : []
};

export default function reducer(state = initialState, action) {
  const { CONNECT, DISCONNECT, JOIN_ROOM, LEAVE_ROOM, RSV_MSG, SEND_MSG } = actions;
  switch (action.type) {
    case CONNECT://set socket
      if(state.socket) return state;//prevent duplicate connection

      const socket = socketio.connect('ws://localhost:4000', {});
      return {
        ...state,
        socket : socket
      }
    case DISCONNECT://clear socket
      return {
        ...state,
        socket : null
      }
    case JOIN_ROOM://set room
      return {
        ...state,
        room : action.payload
      }
    case LEAVE_ROOM://clear room
      return {
        ...state,
        room : null
      }
    case RSV_MSG:
      return {
        ...state,
        message : [ ...state.message, action.payload ]
      }
    case SEND_MSG:
      return {
        ...state,
        message : [ ...state.message, action.payload ]
      }
    default:
      return state
  }
}