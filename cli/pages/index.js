import React, {useEffect} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { HomePage } from '../src/pages';
import { wrapper } from '../src/stores';

import { actions as counterAction } from '../src/stores/counter'
import { actions as tickAction } from '../src/stores/tick'

const { addAsync } = counterAction;
const { tick } = tickAction;

function Index(props) {
  return (<HomePage {...props}/>);
}

export const getStaticProps = wrapper.getStaticProps(async ({ store }) => {
  store.dispatch(tick())
  store.dispatch(addAsync())
})

const mapDispatchToProps = (dispatch) => {
  return {
    tick: bindActionCreators(tick, dispatch),
    addAsync: bindActionCreators(addAsync, dispatch),
  }
}

export default connect(null, mapDispatchToProps)(Index);