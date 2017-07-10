# Simple Server to front Mastercard Qkr! APIs #
You could use this to host your backend services that can house calls to Mastercard Qkr! APIs.

If you are looking to call Qkr! APIs directly then head over to [node-qkr-api](https://github.com/perusworld/node-qkr-api)

You can add your API call authentication logic in [api.ts](./src/api.ts) marked by
```javascript
//TODO: Your API Request Authentication Logic
```

## Run ##
- Bash
```bash
export QKR_PUBLIC_KEY="---qkr-public-key---"
export QKR_PRIVATE_KEY="---qkr-private-key---"
export QKR_URL="---qkr-sandbox-or-production-url---"
npm run build && npm start
```
 - Powershell
```powershell
$env:QKR_PUBLIC_KEY="---qkr-public-key---"
$env:QKR_PRIVATE_KEY="---qkr-private-key---"
$env:QKR_URL="---qkr-sandbox-or-production-url---"
npm run build ; npm start
```
-Heroku
```bash
heroku create yourappserver
heroku config:set NPM_CONFIG_PRODUCTION=false
heroku config:set QKR_PUBLIC_KEY="---qkr-public-key---"
heroku config:set QKR_PRIVATE_KEY="---qkr-private-key---"
heroku config:set QKR_URL="---qkr-sandbox-or-production-url---"
git push heroku master
```

## Test Calls (the [test](./test) folder contains sample test calls as well) ##
### Lightbox ###
```bash
curl --request POST \
  --url http://localhost:3000/api/v1/lightbox \
  --header 'cache-control: no-cache' \
  --header 'content-type: application/json' \
  --data '{"countryOfResidence":"US","callbackUrl":"myapp://lightbox"}'
```
### Login ###
```bash
curl --request POST \
  --url http://localhost:3000/api/v1/login \
  --header 'cache-control: no-cache' \
  --header 'content-type: application/json' \
  --data '{"email":"someemail@somedomain.com","pwd":"somepassword99"}'
```
### Merchant List ###
```bash
curl --request POST \
  --url http://localhost:3000/api/v1/merchant/list \
  --header 'cache-control: no-cache' 
```
### Product List ###
```bash
curl --request POST \
  --url http://localhost:3000/api/v1/product/list \
  --header 'cache-control: no-cache' \
  --header 'content-type: application/json' \
  --data '{"id":"155952"}'
```
### Cart Add ###
```bash
curl --request POST \
  --url http://localhost:3000/api/v1/cart/add \
  --header 'cache-control: no-cache' \
  --header 'content-type: application/json' \
  --data '{"token": "logintoken","request":{"locatedScanId": "155955","outletId": "155942","purchaseNote": "Some note","quantity": 1,"variantId": "155954"}}'
```
### Card List ###
```bash
curl --request POST \
  --url http://localhost:3000/api/v1/card/list \
  --header 'cache-control: no-cache' \
  --header 'content-type: application/json' \
  --data '{"token": "logintoken"}'
```
### Cart List ###
```bash
curl --request POST \
  --url http://localhost:3000/api/v1/cart/list \
  --header 'cache-control: no-cache' \
  --header 'content-type: application/json' \
  --data '{"token": "logintoken"}'
```
### Cart Checkout ###
```bash
curl --request POST \
  --url http://localhost:3000/api/v1/cart/checkout \
  --header 'cache-control: no-cache' \
  --header 'content-type: application/json' \
  --data '{"token": "logintoken","request":{"amountMinorUnits": "200","cardId": "1","cartId": "1","tipAmount": 0}}'
```
### Address List ###
```bash
curl --request POST \
  --url http://localhost:3000/api/v1/address/list \
  --header 'cache-control: no-cache' \
  --header 'content-type: application/json' \
  --data '{"token": "logintoken"}'
```
