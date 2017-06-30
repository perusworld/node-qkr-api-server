import { requestWrapper } from './base.test'

let email = process.env.QKR_TEST_USER;
let password = process.env.QKR_TEST_PWD;

describe('checkout', () => {

    it('should checkout', (done) => {
        let req = requestWrapper();
        let ctx = <any>{};
        req.send({
            endpoint: 'login',
            method: 'POST',
            payload: {
                email: email,
                pwd: password
            }
        }).then(resp => {
            console.log('Login', resp);
            ctx.auth = resp;
            ctx.authToken = resp.accessToken.token;
            return req.send({
                endpoint: 'merchant/list',
                method: 'POST'
            });
        }).then(resp => {
            console.log('Merchants', resp);
            ctx.merchants = resp;
            ctx.merchantId = resp[0].id;
            ctx.outletId = resp[0].outlets[0].id;
            return req.send({
                endpoint: 'product/list',
                method: 'POST',
                payload: {
                    id: ctx.merchants[0].outlets[0].prodGroupSummaries[0].id
                }
            });
        }).then(resp => {
            console.log('Products', resp);
            ctx.products = resp;
            return req.send({
                endpoint: 'cart/add',
                method: 'POST',
                payload: {
                    token: ctx.authToken,
                    request: {
                        locatedScanId: ctx.products.locatedScanId,
                        outletId: ctx.outletId,
                        purchaseNote: "Some note",
                        quantity: 1,
                        variantId: ctx.products.products[0].variants[0].id
                    }
                }
            });
        }).then(resp => {
            console.log('Cart Add', resp);
            return req.send({
                endpoint: 'cart/list',
                method: 'POST',
                payload: {
                    token: ctx.authToken
                }
            });
        }).then(resp => {
            console.log('Cart List', resp);
            ctx.carts = resp;
            return req.send({
                endpoint: 'card/list',
                method: 'POST',
                payload: {
                    token: ctx.authToken
                }
            });
        }).then(resp => {
            console.log('Card List', resp);
            ctx.cards = resp;
            return req.send({
                endpoint: 'cart/checkout',
                method: 'POST',
                payload: {
                    token: ctx.authToken,
                    request: {
                        amountMinorUnits: ctx.carts[0].amountMinorUnits,
                        cardId: ctx.cards[0].id,
                        cartId: ctx.carts[0].cartId,
                        tipAmount: 0

                    }
                }
            });
        }).then(resp => {
            console.log(JSON.stringify(resp, null, 2));
            done();
        }).catch(err => {
            console.log(err);
            done();
        });
    });

});