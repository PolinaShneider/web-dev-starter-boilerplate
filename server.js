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
    constructor({port}) {
        this.server = http.createServer((request, response) => {
            this.onRequest(request, response);
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
     * @param {http.IncomingMessage} request
     * @param {http.ServerResponse} response
     */
    onRequest(request, response) {
        ServerExample.allowCors(response);

        const {url} = request;

        if (url.indexOf('fromFile') > -1) {
            this.readJsonFromFile(response);
        } else if (url.indexOf('fetchUrl') > -1) {
            const link = decodeURIComponent(url.slice('/fetchUrl?url='.length));
            this.fetchFromLink(response, link);
        }

    }

    /**
     * Read JSON from file 'data.json' in repository
     * @param response - server response
     */
    readJsonFromFile(response) {
        fs.readFile('src/files/data.json', 'utf8', function (err, data) {
            if (err) throw err;
            response.end(JSON.stringify ({
                success: 1,
                data: JSON.parse(data)
            }));
        });
    }

    /**
     * Read JSON from link and return to front-end
     * @param response - server response
     * @param link - link to JSON
     */
    fetchFromLink(response, link) {
        request({
            url: link,
            json: true
        }, function (error, result, body) {

            if (!error && result.statusCode === 200) {
                response.end(JSON.stringify ({
                    success: 1,
                    data: body
                }));
            } else {
                response.end(JSON.stringify ({
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
    static allowCors(response) {
        response.setHeader('Access-Control-Allow-Origin', '*');
        response.setHeader('Access-Control-Allow-Credentials', 'true');
        response.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT');
        response.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
    }
}

new ServerExample({
    port: 8008
});
