import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { SignInPage } from '../src/pages'
import { wrapper } from '../src/stores';

import { addCount } from '../src/stores/count/action';
import { serverRenderClock, startClock } from '../src/stores/tick/action'

function SignIn(props) {
  return (
    <SignInPage {...props}/>
  );
}

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

export default connect(null, mapDispatchToProps)(SignIn);