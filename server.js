/**
 * Sample HTTP server
 * [!] Use it only for debugging purposes
 * 
 * node server.js
 */
const http = require('http');
const fs = require('fs');
const request = require('request');


class ServerExample {
    constructor({port, fieldName}) {
        this.fieldName = fieldName;
        this.server = http.createServer((req, res) => {
            this.onRequest(req, res);
        }).listen(port);

        this.server.on('listening', () => {
            console.log(`Server is listening on port ${port} 💎`);
        });

        this.server.on('error', (error) => {
            console.log(`Failed to run server ${error}`);
        });
    }

    /**
     * Request handler
     * @param {http.IncomingMessage} req
     * @param {http.ServerResponse} res
     */
    onRequest(req, res) {
        this.allowCors(res);

        const {url} = req;

        if (url.indexOf('fromFile') > -1) {
            this.readJsonFromFile(res);
        } else if (url.indexOf('fetchUrl') > -1) {
            const link = decodeURIComponent(url.slice('/fetchUrl?url='.length));
            this.fetchFromLink(res, link);
        }

    }

    readJsonFromFile(res) {
        fs.readFile('data.json', 'utf8', function (err, data) {
            if (err) throw err;
            res.end(JSON.stringify ({
                success: 1,
                data: JSON.parse(data)
            }));
        });
    }

    fetchFromLink(res, link) {
        request({
            url: link,
            json: true
        }, function (error, response, body) {

            if (!error && response.statusCode === 200) {
                res.end(JSON.stringify ({
                    success: 1,
                    data: body
                }));
            } else {
                res.end(JSON.stringify ({
                    success: 0,
                    data: {}
                }));
            }
        })
    }

    /**
     * Allows CORS requests for debugging
     * @param response
     */
    allowCors(response) {
        response.setHeader('Access-Control-Allow-Origin', '*');
        response.setHeader('Access-Control-Allow-Credentials', 'true');
        response.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT');
        response.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
    }
}

new ServerExample({
    port: 8008,
    fieldName: 'link'
});
