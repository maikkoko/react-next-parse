import express from 'express';
import http from 'http';
import next from 'next';
import { ParseServer } from 'parse-server';

// Setup Mongo Database
const databaseUri = process.env.DATABASE_URI;
if (!databaseUri) {
  /* eslint-disable-next-line no-console */
  console.log('DATABASE_URI not specified, falling back to localhost.');
}

// Setup Parse Server API
const api = new ParseServer({
  databaseURI: databaseUri || 'mongodb://localhost:27017/dev',
  cloud: process.env.CLOUD_CODE_MAIN || './cloud/main.js',
  appId: process.env.APP_ID || 'myAppId',
  masterKey: process.env.MASTER_KEY || 'myMasterKey',
  serverURL: process.env.SERVER_URL || 'http://localhost:1337/parse',
  liveQuery: {
    classNames: ['Todo'],
  },
});

// Port number
const PORT = parseInt(process.env.PORT, 10) || 1337;

// Setup Next JS
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });

app.prepare().then(() => {
  const server = express();
  const handle = app.getRequestHandler();

  // Serve the Parse API on the /parse URL prefix
  const mountPath = process.env.PARSE_MOUNT || '/parse';
  server.use(mountPath, api);

  // Serve next js pages
  server.get('*', (req, res) => handle(req, res));

  const httpServer = http.createServer(server);
  httpServer.listen(PORT, (err) => {
    if (err) throw err;
    /* eslint-disable-next-line no-console */
    console.log(`> Ready on http://localhost:${PORT}`);
  });

  // LiveQuery Server
  ParseServer.createLiveQueryServer(httpServer);
});
