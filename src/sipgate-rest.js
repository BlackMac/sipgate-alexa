function _request (uri, callback, bearer) {
  console.log(uri)
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
      console.log(fullResult)
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
    'history': (callback, offset, limit, types) => {
      var params = []
      params.push('offset=' + offset)
      params.push('limit=' + limit)
      types.forEach((type) => {
        params.push('types=' + type)
      })
      _request('/v1/w0/history?' + params.join('&'), callback, bearer)
    }
  }
}
