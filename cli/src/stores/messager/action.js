export const actions = {
    CONNECT: 'CONNECT',
    DISCONNECT: 'DISCONNECT',
    JOIN_ROOM : 'JOIN_ROOM',
    LEAVE_ROOM : 'LEAVE_ROOM',
    RSV_MSG : 'RSV_MSG',
    SEND_MSG: 'SEND_MSG',
}
  
export const connectSocket = (dispatch) => dispatch({ type: actions.CONNECT })
export const disconnectSocket = (dispatch) => dispatch({ type: actions.DISCONNECT })
export const joinRoom = (dispatch) => dispatch({ type: actions.JOIN_ROOM })
export const leaveRoom = (dispatch) => dispatch({ type: actions.LEAVE_ROOM })
export const receiveMessage = (dispatch) => dispatch({ type: actions.RSV_MSG })
export const sendMessage = (dispatch) => dispatch({ type: actions.SEND_MSG })