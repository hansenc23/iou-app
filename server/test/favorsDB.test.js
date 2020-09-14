const express = require('express')
const request = require('supertest')
const assert = require('assert');

const routes = require('../routes')
const dbHandler = require('./db-handler')


describe('Favor database test', () => {

    let app, server

    beforeAll(async (done) => {
        await dbHandler.connect()
        app = express();
        app.use(express.json({ extended: false }));
        app.use('/', routes)
        server = app.listen(6969);
        done()
    })

    afterAll(async (done) => {
        await dbHandler.closeDatabase()
        server.close()
        done()
    })

    it('Check if /favor is ok ', (done) => {
        request(app).get('/favors').expect("Favors API OK", done);
    });

    it('POST /favors/create working correctly', (done) => {
        request(app).post('/favors/create')
            .send({
                ower: "507c7f79bcf86cd7994f6c0e",
                owner: "5f54a1e86f48db1c66669303",
                favor_detail: "Coffee",
                picture_proof_id: "5f54a1eec78d6793ba14ea7c"
            })
            .set('Accept', 'application/json')
            .expect(200).then(response => {
                assert.strictEqual(response.body.success, true)
                assert.strictEqual(response.body.data.ower, "507c7f79bcf86cd7994f6c0e")
                assert.strictEqual(response.body.data.owner, "5f54a1e86f48db1c66669303")
                assert.strictEqual(response.body.data.favor_detail, "Coffee")
                assert.strictEqual(response.body.data.picture_proof_id, "5f54a1eec78d6793ba14ea7c")
                done()
            })
    })

    it('GET /favors/all/ower/:id working correctly', (done) => {
        request(app).get('/favors/all/ower/507c7f79bcf86cd7994f6c0e')
            .expect(200).then(response => {
                assert.strictEqual(response.body.success, true)
                assert.strictEqual(response.body.data.length > 0, true)
                done()
            })
    })

    it('GET /favors/all/owner/:id working correctly', (done) => {
        request(app).get('/favors/all/owner/5f54a1e86f48db1c66669303')
            .expect(200).then(response => {
                assert.strictEqual(response.body.success, true)
                assert.strictEqual(response.body.data.length > 0, true)
                done()
            })
    })


})
