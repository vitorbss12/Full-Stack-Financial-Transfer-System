import 'express-async-errors';
import * as express from 'express';
import routes from './routes';
import errorHandler from './middlewares/errors.middleware';

export default class App {
  public app: express.Express;

  constructor() {
    this.app = express();

    this.config();

    this.app.get('/test', (_req, res) => res.json({ message: 'Hello World!' }));
  }

  private config():void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

  this.app.use(express.json());
  this.app.use(accessControl);
  this.app.use('/users', routes.userRouter);
  this.app.use('/accounts', routes.accountRouter);

  this.app.use(errorHandler);
  }

  public start(PORT: string | number):void {
    this.app.listen(PORT, () => console.log(`Running on port ${PORT}`));
  }
}
