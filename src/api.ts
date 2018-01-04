import { NextFunction, Request, Response, Router } from "express";
import * as passport from "passport";
import { QKRApi } from "node-qkr-api";
import { APIKeyStrategyProvider } from "passport-apikey";

export class APIRoute {

  /**
   * Constructor
   *
   * @class APIRoute
   * @constructor
   */
  constructor(private qkrApi: QKRApi) {
  }

  public login(req: Request, res: Response, next: NextFunction) {
    this.qkrApi.login(req.body.email, req.body.pwd).then(resp => {
      res.json(resp);
    }).catch(err => {
      res.json(err);
    });
  }

  public lightbox(req: Request, res: Response, next: NextFunction) {
    this.qkrApi.getLightbox(req.body).then(resp => {
      res.json(resp);
    }).catch(err => {
      res.json(err);
    });
  }

  public getMerchants(req: Request, res: Response, next: NextFunction) {
    this.qkrApi.getMerchants().then(resp => {
      res.json(resp);
    }).catch(err => {
      res.json(err);
    });
  }

  public getProducts(req: Request, res: Response, next: NextFunction) {
    this.qkrApi.getProducts(req.body.id).then(resp => {
      res.json(resp);
    }).catch(err => {
      res.json(err);
    });
  }

  public getCarts(req: Request, res: Response, next: NextFunction) {
    this.qkrApi.getCarts({
      accessToken: {
        token: req.body.token
      }
    }).then(resp => {
      res.json(resp);
    }).catch(err => {
      res.json(err);
    });
  }

  public addCart(req: Request, res: Response, next: NextFunction) {
    this.qkrApi.addCart({
      accessToken: {
        token: req.body.token
      }
    }, req.body.request).then(resp => {
      res.json(resp);
    }).catch(err => {
      res.json(err);
    });
  }

  public getCards(req: Request, res: Response, next: NextFunction) {
    this.qkrApi.getCards({
      accessToken: {
        token: req.body.token
      }
    }).then(resp => {
      res.json(resp);
    }).catch(err => {
      res.json(err);
    });
  }

  public buyCart(req: Request, res: Response, next: NextFunction) {
    this.qkrApi.buyCart({
      accessToken: {
        token: req.body.token
      }
    }, req.body.request).then(resp => {
      res.json(resp);
    }).catch(err => {
      res.json(err);
    });
  }

  public getAddresses(req: Request, res: Response, next: NextFunction) {
    this.qkrApi.getAddresses({
      accessToken: {
        token: req.body.token
      }
    }).then(resp => {
      res.json(resp);
    }).catch(err => {
      res.json(err);
    });
  }

  public addAddress(req: Request, res: Response, next: NextFunction) {
    this.qkrApi.addAddress({
      accessToken: {
        token: req.body.token
      }
    }, req.body.request).then(resp => {
      res.json(resp);
    }).catch(err => {
      res.json(err);
    });
  }

  public deleteAddress(req: Request, res: Response, next: NextFunction) {
    this.qkrApi.deleteAddress({
      accessToken: {
        token: req.body.token
      }
    }, req.body.id).then(resp => {
      res.json(resp);
    }).catch(err => {
      res.json(err);
    });
  }

  public expressCheckout(req: Request, res: Response, next: NextFunction) {
    this.qkrApi.expressPayment({
      accessToken: {
        token: req.body.token
      }
    }, req.body.request).then(resp => {
      res.json(resp);
    }).catch(err => {
      res.json(err);
    });
  }

  public profile(req: Request, res: Response, next: NextFunction) {
    this.qkrApi.getUserProfile({
      accessToken: {
        token: req.body.token
      }
    }, req.body.id).then(resp => {
      res.json(resp);
    }).catch(err => {
      res.json(err);
    });
  }

  /**
   * buildRoutes
   */
  public buildRoutes(router: Router) {
    console.log("[APIRoute::create] Creating api route.");

    passport.use(APIKeyStrategyProvider.getInstance());
    router.use(passport.authenticate('apikey', { session: false }));
    
    router.post("/login", this.login.bind(this));
    router.post("/lightbox", this.lightbox.bind(this));
    router.post("/cart/list", this.getCarts.bind(this));
    router.post("/cart/add", this.addCart.bind(this));
    router.post("/cart/checkout", this.buyCart.bind(this));
    router.post("/card/list", this.getCards.bind(this));
    router.post("/merchant/list", this.getMerchants.bind(this));
    router.post("/product/list", this.getProducts.bind(this));
    router.post("/address/list", this.getAddresses.bind(this));
    router.post("/address/add", this.addAddress.bind(this));
    router.delete("/address/delete", this.deleteAddress.bind(this));
    router.post("/express/checkout", this.expressCheckout.bind(this));
    router.post("/profile", this.profile.bind(this));
    
  }

}
