import './db/chat-db';
import './db/contacts-db';
import './db/notification-panel-db';
import history from '@history';
import mock from './mock';

mock.onAny().passThrough();

if (module?.hot?.status() === 'apply') {
  const { pathname } = history.location;
  history.push('/loading');
  history.push({ pathname });
}
