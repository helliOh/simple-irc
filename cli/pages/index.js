import React, {useEffect} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { HomePage } from '../src/pages';
import { wrapper } from '../src/stores';

import { actions as counterAction } from '../src/reducers/counter'
import { actions as tickAction } from '../src/reducers/tick'

const { addAsync } = counterAction;
const { tick } = tickAction;

function Index(props) {
  return (<HomePage {...props}/>);
}

export const getStaticProps = wrapper.getStaticProps(({store, preview}) => {
  console.log('2. Page.getStaticProps uses the store to dispatch things');
  store.dispatch(tick()),
  store.dispatch(addAsync())
});

const mapStateToProps = (state) => ({
  counter: state.counter,
  ticks : state.tick
})

const mapDispatchToProps = (dispatch) => {
  return {
    tick: bindActionCreators(tick, dispatch),
    addAsync: bindActionCreators(addAsync, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Index);