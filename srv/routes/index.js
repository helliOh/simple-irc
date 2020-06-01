import { UserApi, RoomApi, ChatApi } from './api';
import FooClient from './client/foo.js';

export default function App(app){
  //API routes
  app.use('/api/users', UserApi);
  app.use('/api/rooms', RoomApi);
  app.use('/api/chats', ChatApi);

  //Client routes
  app.use('/', FooClient);
}
