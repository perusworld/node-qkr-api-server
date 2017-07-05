import * as bodyParser from "body-parser";
import * as express from "express";
import * as path from "path";
import * as cors from "cors";

import { APIRoute } from "./api";
import { QKRApi } from "node-qkr-api";

/**
 * The server.
 *
 * @class Server
 */
export class Server {

  public app: express.Application;

  /**
   * Bootstrap the application.
   *
   * @class Server
   * @method bootstrap
   * @static
   * @return {ng.auto.IInjectorService} Returns the newly created injector for this app.
   */
  public static bootstrap(): Server {
    return new Server();
  }

  /**
   * Constructor.
   *
   * @class Server
   * @constructor
   */
  constructor() {
    //create expressjs application
    this.app = express();

    //configure application
    this.config();

    //add api
    this.api();
  }

  /**
   * Create REST API routes
   *
   * @class Server
   * @method api
   */
  public api() {

    let qkrApi = new QKRApi({
        publicKey: process.env.QKR_PUBLIC_KEY,
        privateKey: process.env.QKR_PRIVATE_KEY,
        urlPrefix: process.env.QKR_URL
    });

    let router = express.Router();
    let apiRoutes = new APIRoute(qkrApi);
    apiRoutes.buildRoutes(router);
    this.app.use('/api/v1', router);
  }

  /**
   * Configure application
   *
   * @class Server
   * @method config
   */
  public config() {
    //add cors all
    this.app.use(cors());

    //add static paths
    this.app.use(express.static(path.join(__dirname, "public")));

    //configure pug
    this.app.set("views", path.join(__dirname, "views"));
    this.app.set("view engine", "pug");

    //mount json form parser
    this.app.use(bodyParser.json());

    //mount query string parser
    this.app.use(bodyParser.urlencoded({
      extended: true
    }));


    // catch 404 and forward to error handler
    this.app.use(function(err: any, req: express.Request, res: express.Response, next: express.NextFunction) {
        err.status = 404;
        next(err);
    });

  }

}