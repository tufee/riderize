import pino from 'pino';

const logger = pino({
  level: 'info',
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true
    }
  },
  serializers: {
    req: (req) => ({
      method: req.method,
      url: req.url,
      headers: req.headers,
      remoteAddress: req.socket.remoteAddress,
      remotePort: req.socket.remotePort,
    }),
    res: (res) => ({
      statusCode: res.statusCode,
    }),
  },
});

export default logger;


