import React, { useEffect } from 'react';

import withReduxSaga from 'next-redux-saga';
import Head from 'next/head';

import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import theme from '../src/theme';
import { NavBar } from '../src/components';
import { wrapper } from '../src/stores';

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <React.Fragment>
      <Head>
        <title>My page</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <NavBar />
        <Component {...pageProps}/>
      </ThemeProvider>
    </React.Fragment>
  );
}

const configureStore = (initialState, options) => {
  const sagaMiddleware = createSagaMiddleware(); // 리덕스 사가 생성
  const middlewares = [sagaMiddleware]; // 미들웨어 연결
  const enhancer = process.env.NODE_ENV === 'production' ? 
    compose(applyMiddleware(...middlewares)) : 
        composeWithDevTools(
          applyMiddleware(...middlewares)
        );
  const store = createStore(reducer, initialState, enhancer); // enhancer에 넣어서 saga가 적용된 store 생성
  store.sagaTask = sagaMiddleware.run(rootSaga); // store에 rootSaga를 넣은 sagaMiddleware를 실행시켜준다.
  return store;

}

export default wrapper.withRedux(withReduxSaga(MyApp));