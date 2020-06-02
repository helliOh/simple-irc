import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import socketio from 'socket.io-client';
import axios from 'axios';

import { AboutPage } from '../src/pages'
import { wrapper } from '../src/stores';

import { addCount } from '../src/stores/count/action';
import { serverRenderClock, startClock } from '../src/stores/tick/action'

function About(props) {
  const socket = socketio.connect('ws://localhost:4000', {});

  return (<AboutPage {...props} socket={socket}/>);
}

// About.getInitialProps = async () =>{
//   try{
//     const response = await axios.get('http://localhost:4000/api/rooms');
    
//     return response.data;
//   }
//   catch(e){
//     console.log(e);
//     return e;
//   }
// }

export const getStaticProps = wrapper.getStaticProps(async ({ store }) => {
  store.dispatch(serverRenderClock(true))
  store.dispatch(addCount())
})

const mapDispatchToProps = (dispatch) => {
  return {
    addCount: bindActionCreators(addCount, dispatch),
    startClock: bindActionCreators(startClock, dispatch),
  }
}

export default connect(null, mapDispatchToProps)(About);