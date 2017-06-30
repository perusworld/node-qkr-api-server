import { requestWrapper } from './base.test'

describe('check lightbox', () => {

    it('should lightbox', (done) => {
        let req = requestWrapper();
        req.send({
            endpoint: 'lightbox',
            method: 'POST',
            payload: {
                countryOfResidence: "US",
                callbackUrl: "myapp://lightbox"
            }
        }).then(resp => {
            console.log(JSON.stringify(resp, null, 2));
            done();
        }).catch(err => {
            console.log(err);
            expect(err).toBeNull();
        });
    });

});