var Sipgate = (bearer) => {

}

Sipgate.prototype._request (uri, params, callback) => {
  var https = require('https');
  var options = {
    hostname: 'api.sipgate.com',
    port: 443,
    path: uri, //'/v1/w0/history?types=VOICEMAIL&offset=0&limit=1',
    method: 'GET',
    headers: {
      'Authorization': 'Bearer '+this.bearer,
      'Accept':'application/json'
    },
    timeout:5000
  };
  var req = https.get(options, (res) => {
      res.on('data', (d) => {
          var resultdata = JSON.parse(d);
      });
  });
  req.on('error', (d) => {
      callback();
  });
  req.end();
}

//
// Sipgate.prototype.intentHandlers = {
//
// }
//
// function request(uri, params, callback) {
//   var https = require('https');
//   var options = {
//     hostname: 'api.sipgate.com',
//     port: 443,
//     path: '/v1/w0/history?types=VOICEMAIL&offset=0&limit=1',
//     method: 'GET',
//     headers: {
//       'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpc1Rlc3RBY2NvdW50IjpmYWxzZSwic3ViIjoidzAiLCJwcm9kdWN0IjoidGVhbSIsImRvbWFpbiI6InNpcGdhdGUuZGUiLCJzY29wZSI6ImFsbCIsIm1hc3RlclNpcElkIjoiMzAwNjY0OSIsImZsYWdzIjpbXSwiaXNBZG1pbiI6dHJ1ZSwibG9jYWxlIjoiZGVfREUiLCJleHAiOjE0ODYwODA4NzYsImlhdCI6MTQ4NTk5NDQ3NiwianRpIjoiYjIyMDk3OTUtMzNhOC00OGEzLWE1MDEtMWI0MzZiYzE1NDUxIn0=.K0KQ4IRv_dS43d9f0Ff_9LtpI5W6r-d1DC0R_YAKbONJ3HtMGKvztizCCLblXLAmHu50PrKrCZY5zoe4YurRjw==',
//       'Accept':'application/json'
//     },
//     timeout:5000
//   };
// }
//
// var req = https.get(options, (res) => {
//     res.on('data', (d) => {
//         var resultdata = JSON.parse(d);
//         var callerid = resultdata.items[0].source.split('').join(' ');
//         var callername = resultdata.items[0].sourceAlias;
//         callback(null, buildResponse({},buildSpeechletResponse("Test",resultdata.items[0].transcription,"Next",true)));
//
//     });
// });
// req.on('error', (d) => {
//     callback(null, buildResponse({},buildSpeechletResponse("Test","Fehler","Next",true)));
// });
// req.end();
