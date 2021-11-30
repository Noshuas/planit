const express = require('express');
const fileupload = require('express-fileupload');

const { parse } = require('url');
const next = require('next');
require('../database');
const { session, cors, login: passport } = require('./middleware');
const { app: httpServer, initRoutes } = require('./index');

const dev = true;
const nextServer = next({ dev });
// const handle = nextServer.getRequestHandler();

nextServer.prepare().then(() => {
  httpServer.use(express.json({ limit: '3MB' }));
  httpServer.use(express.urlencoded({ extended: true }));
  httpServer.use(fileupload({ useTempFiles: true }));
  httpServer.use(cors.corsPolicy);
  httpServer.use(session.sessionParser);
  httpServer.use(session.cookieParser);
  // httpServer.use(express.bodyParser());

  // httpServer.use(session.sessionParser);
  httpServer.use(passport.initialize());
  httpServer.use(passport.session());
  httpServer.use(session.sessionManager);

  // Middleware to pass the next renderer onto the req object
  httpServer.use((req, res, next) => {
    const nextRender = (pathname) => {
      const parsedUrl = parse(req.url, true);
      const { query } = parsedUrl;
      nextServer.render(req, res, pathname, query);
    };
    res.nextRender = nextRender;
    next();
  });
  initRoutes(httpServer);

  // server-sided rendering
  httpServer.use((req, res, next) => {
    const { method } = req;
    // proxy all get requests to render to the virtual
    // next.js server.
    if (method === 'GET') {
      const parsedUrl = parse(req.url, true);
      const { pathname, query } = parsedUrl;

      if (!pathname.startsWith('/api')) {
        nextServer.render(req, res, pathname, query);
      } else {
        next();
      }
    }
  });

  httpServer.listen(3000, () => {
    console.log('Listening on localhost:3000');
  });
});
