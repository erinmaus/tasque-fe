export function getBackendEndpoint() {
  switch (window.location.hostname) {
    // case 'localhost':
    //  return 'http://localhost:8000';
    case 'tasque.itsyrealm.com':
    default:
      return 'https://api.tasque.itsyrealm.com';
  }
}
