function _request (uri, callback, bearer) {
  var https = require('https')
  var options = {
    hostname: 'api.sipgate.com',
    port: 443,
    path: uri,
    method: 'GET',
    headers: {
      'Authorization': 'Bearer ' + bearer,
      'Accept': 'application/json'
    },
    timeout: 5000
  }
  var fullResult = ''
  var req = https.get(options, (res) => {
    res.on('data', (d) => {
      fullResult += d
    })
    res.on('end', () => {
      var resultdata = JSON.parse(fullResult)
      callback(resultdata)
    })
  })
  req.on('error', (d) => {
    callback()
  })
  req.end()
}

module.exports = (bearer) => {
  //
  return {
    'balance': (callback) => {
      _request('/v1/balance', callback, bearer)
    },
    'history': (callback, offset = 0, limit = 10, types = []) => {
      var params = []
      params.push('offset=' + offset)
      params.push('limit=' + limit)
      types.forEach(() => {
        params.push('types=' + limit)
      })
      _request('/v1/w0/history?' + params.join('&'), callback, bearer)
    }
  }
}
