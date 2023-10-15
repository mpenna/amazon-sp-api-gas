// const TimeoutManager = require('./TimeoutManager');
// const https = require('https');
// const { URL } = require('url');

// const URL = require('core-js/proposals/url');
const URL = require('core-js/web/url');

module.exports = (req_options) => {

  return new Promise((resolve, reject) => {

    const logObj = {
      function: 'gas-request',
      params: { req_options }
    }
    // Logger.log(JSON.stringify(logObj));

    const url = new URL(req_options.url);

    // Logger.log(JSON.stringify(url));

    // delete req_options.headers['host'];
    // delete req_options.headers['user-agent'];
    if (req_options.headers) {
      if (req_options.headers['host']) {
        delete req_options.headers['host'];
      }

      if (req_options.headers['user-agent']) {
        delete req_options.headers['user-agent'];
      }
    }

    const options = {
      method: req_options.method,
      headers: req_options.headers || {},
      muteHttpExceptions: true,
    };

    if (req_options.body) {
      options['payload'] = req_options.body;
    }

    try {
      // Logger.log(JSON.stringify({ url, options }));

      let response = UrlFetchApp.fetch(url, options);

      // Logger.log(JSON.stringify(response));

      const resData = {
        statusCode: response.getResponseCode(),
        headers: response.getAllHeaders(),
        body: response.getContentText('UTF-8'),
        // TODO: the 'download' feature depends on this chunked return
        // chunks: [],
        // chunks: response.getContent(),
        chunks: response.getBlob().getBytes(),
      };

      // Logger.log(JSON.stringify(resData));

      resolve(resData);
    } catch (error) {
      reject(error);
    }

  });

};
