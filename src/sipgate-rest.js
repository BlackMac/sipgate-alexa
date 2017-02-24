const https = require('https');

function request(uri, callback, bearer) {
  console.log(uri);
  const options = {
    hostname: 'api.sipgate.com',
    port: 443,
    path: uri,
    method: 'GET',
    headers: {
      Authorization: `Bearer ${bearer}`,
      Accept: 'application/json',
    },
    timeout: 5000,
  };
  var fullResult = '';
  const req = https.get(options, (res) => {
    res.on('data', (d) => {
      fullResult += d;
    });
    res.on('end', () => {
      console.log(fullResult);
      const resultdata = JSON.parse(fullResult);
      callback(resultdata);
    });
  });
  req.on('error', () => {
    callback();
  });
  req.end();
}

module.exports = bearer => ({
  balance: (callback) => {
    request('/v1/balance', callback, bearer);
  },
  history: (callback, offset, limit, types) => {
    const params = [];
    params.push(`offset=${offset}`);
    params.push(`limit=${limit}`);
    types.forEach((type) => {
      params.push(`types=${type}`);
    });
    request(`/v1/w0/history?${params.join('&')}`, callback, bearer);
  },
});
