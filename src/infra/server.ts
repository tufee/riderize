import cors from 'cors';
import * as dotenv from 'dotenv';
import express from 'express';
import logger from './helper/logger';
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => logger.info(`Server started on port ${port}`));
}

export { app };


