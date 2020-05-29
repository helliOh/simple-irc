import FooApi from './api/foo';
import ChatApi from './api/chat';
import FooClient from './client/foo.js';

export default function App(app){
  //API routes
  app.use('/api/foo', FooApi);
  app.use('/api/chat', ChatApi);

  //Client routes
  app.use('/', FooClient);
}
