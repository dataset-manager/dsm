var _request = require('request')

function request (opts) {
  return new Promise(function (resolve, reject) {
    _request(opts, function (err, response, body) {
      var is2xx = !err && /^2/.test('' + response.statusCode)
      if (err || !is2xx) {
        return reject(new Error({err: err, body: body}))
      }
      resolve(body)
    })
  })
}

function options (token, url, method) {
  return {
    method: method || 'GET',
    url: url,
    headers: {
      'Authorization': 'Token ' + token,
      'User-Agent': 'Sketch-builder-Release-Agent'
    }
  }
}

module.exports = {
  getUser: function (token) {
    return request(options(token, 'https://api.github.com/user'))
  }
}
