


var AlexaSipgate = () => {}
AlexaSipgate.prototype.intentHandlers = {
  BalanceIntent: () => {

  }
}

exports.handler = (event, context, callback) => {
  if (event.session.application.applicationId !== 'amzn1.echo-sdk-ams.app.[unique-value-here]') {
    callback('Invalid Application ID');
  }
  if (event.session.new) {
    //onSessionStarted({ requestId: event.request.requestId }, event.session);
  }
  if (event.request.type === 'LaunchRequest') {
  } else if (event.request.type === 'IntentRequest') {
    var intentName = event.request.intent.name;
    intentHandler = this.intentHandlers[intentName];
       if (intentHandler) {
           console.log('dispatch intent = ' + intentName);
           intentHandler.call(this, intent, session, response);
       } else {
           throw 'Unsupported intent = ' + intentName;
       }
  }
}


var Alexagate = function() {

}

Alexagate.prototype.intentHandlers = {
  PlayVoicemailIntent: function () {

  },
  ReadVoicemailIntent: function () {

  },
  BalanceIntent: function() {

  },
  LastCallerIntent: function () {

  },
  DialNumberWithLocalPrefixIntent: function () {

  },
  DialNumberWithoutLocalPrefixIntent: function () {

  }
}





'use strict';
function buildResponse(sessionAttributes, speechletResponse) {
    return {
        version: '1.0',
        sessionAttributes,
        response: speechletResponse,
    };
}

function buildPlayerResponse(url) {
    return {
    "directives": [
      {
        "type": "AudioPlayer.Play",
        "playBehavior": "REPLACE_ALL",
        "audioItem": {
          "stream": {
            "token": "43563456345",
            "url": url,
            "offsetInMilliseconds": 0
          }
        }
      }
    ],
    "shouldEndSession": true
  }
}
function buildSpeechletResponse(title, output, repromptText, shouldEndSession) {
    return {
        outputSpeech: {
            type: 'PlainText',
            text: output,
        },
        card: {
            type: 'Simple',
            title: `SessionSpeechlet - ${title}`,
            content: `SessionSpeechlet - ${output}`,
        },
        reprompt: {
            outputSpeech: {
                type: 'PlainText',
                text: repromptText,
            },
        },
        shouldEndSession,
    };
}

// --------------- Main handler -----------------------

// Route the incoming request based on type (LaunchRequest, IntentRequest,
// etc.) The JSON body of the request is provided in the event parameter.
exports.handler = (event, context, callback) => {
    try {

        console.log(`event.session.application.applicationId=${event.session.application.applicationId}`);

        /**
         * Uncomment this if statement and populate with your skill's application ID to
         * prevent someone else from configuring a skill that sends requests to this function.
         */
        /*
        if (event.session.application.applicationId !== 'amzn1.echo-sdk-ams.app.[unique-value-here]') {
             callback('Invalid Application ID');
        }
        */

        if (event.session.new) {
            //onSessionStarted({ requestId: event.request.requestId }, event.session);
        }

        if (event.request.type === 'LaunchRequest') {
            /*onLaunch(event.request,
                event.session,
                (sessionAttributes, speechletResponse) => {
                    callback(null, buildResponse(sessionAttributes, speechletResponse));
                });*/
        } else if (event.request.type === 'IntentRequest') {
            if (event.request.intent.name=="LetzteVoicemailText") {
                var https = require('https');
                var options = {
                  hostname: 'api.sipgate.com',
                  port: 443,
                  path: '/v1/w0/history?types=VOICEMAIL&offset=0&limit=1',
                  method: 'GET',
                  headers: {
                    'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpc1Rlc3RBY2NvdW50IjpmYWxzZSwic3ViIjoidzAiLCJwcm9kdWN0IjoidGVhbSIsImRvbWFpbiI6InNpcGdhdGUuZGUiLCJzY29wZSI6ImFsbCIsIm1hc3RlclNpcElkIjoiMzAwNjY0OSIsImZsYWdzIjpbXSwiaXNBZG1pbiI6dHJ1ZSwibG9jYWxlIjoiZGVfREUiLCJleHAiOjE0ODYwODA4NzYsImlhdCI6MTQ4NTk5NDQ3NiwianRpIjoiYjIyMDk3OTUtMzNhOC00OGEzLWE1MDEtMWI0MzZiYzE1NDUxIn0=.K0KQ4IRv_dS43d9f0Ff_9LtpI5W6r-d1DC0R_YAKbONJ3HtMGKvztizCCLblXLAmHu50PrKrCZY5zoe4YurRjw==',
                    'Accept':'application/json'
                  },
                  timeout:5000
                };
                var req = https.get(options, (res) => {
                    res.on('data', (d) => {
                        var resultdata = JSON.parse(d);
                        var callerid = resultdata.items[0].source.split('').join(' ');
                        var callername = resultdata.items[0].sourceAlias;
                        callback(null, buildResponse({},buildSpeechletResponse("Test",resultdata.items[0].transcription,"Next",true)));

                    });
                });
                req.on('error', (d) => {
                    callback(null, buildResponse({},buildSpeechletResponse("Test","Fehler","Next",true)));
                });
                req.end();
            } else if (event.request.intent.name=="LetzteVoicemail") {
                var https = require('https');
                var options = {
                  hostname: 'api.sipgate.com',
                  port: 443,
                  path: '/v1/w0/history?types=VOICEMAIL&offset=0&limit=1',
                  method: 'GET',
                  headers: {
                    'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpc1Rlc3RBY2NvdW50IjpmYWxzZSwic3ViIjoidzAiLCJwcm9kdWN0IjoidGVhbSIsImRvbWFpbiI6InNpcGdhdGUuZGUiLCJzY29wZSI6ImFsbCIsIm1hc3RlclNpcElkIjoiMzAwNjY0OSIsImZsYWdzIjpbXSwiaXNBZG1pbiI6dHJ1ZSwibG9jYWxlIjoiZGVfREUiLCJleHAiOjE0ODYwODA4NzYsImlhdCI6MTQ4NTk5NDQ3NiwianRpIjoiYjIyMDk3OTUtMzNhOC00OGEzLWE1MDEtMWI0MzZiYzE1NDUxIn0=.K0KQ4IRv_dS43d9f0Ff_9LtpI5W6r-d1DC0R_YAKbONJ3HtMGKvztizCCLblXLAmHu50PrKrCZY5zoe4YurRjw==',
                    'Accept':'application/json'
                  },
                  timeout:5000
                };
                var req = https.get(options, (res) => {
                    res.on('data', (d) => {
                        var resultdata = JSON.parse(d);
                        var callerid = resultdata.items[0].source.split('').join(' ');
                        var callername = resultdata.items[0].sourceAlias;
                        callback(null, buildResponse({},buildPlayerResponse(resultdata.items[0].recordingUrl)));

                    });
                });
                req.on('error', (d) => {
                    callback(null, buildResponse({},buildSpeechletResponse("Test","Fehler","Next",true)));
                });
                req.end();
            } else if (event.request.intent.name=="LetzerAnrufer") {
                var https = require('https');
                var options = {
                  hostname: 'api.sipgate.com',
                  port: 443,
                  path: '/v1/w0/history?directions=INCOMING&directions=MISSED_INCOMING&offset=0&limit=1',
                  method: 'GET',
                  headers: {
                    'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpc1Rlc3RBY2NvdW50IjpmYWxzZSwic3ViIjoidzAiLCJwcm9kdWN0IjoidGVhbSIsImRvbWFpbiI6InNpcGdhdGUuZGUiLCJzY29wZSI6ImFsbCIsIm1hc3RlclNpcElkIjoiMzAwNjY0OSIsImZsYWdzIjpbXSwiaXNBZG1pbiI6dHJ1ZSwibG9jYWxlIjoiZGVfREUiLCJleHAiOjE0ODYwODA4NzYsImlhdCI6MTQ4NTk5NDQ3NiwianRpIjoiYjIyMDk3OTUtMzNhOC00OGEzLWE1MDEtMWI0MzZiYzE1NDUxIn0=.K0KQ4IRv_dS43d9f0Ff_9LtpI5W6r-d1DC0R_YAKbONJ3HtMGKvztizCCLblXLAmHu50PrKrCZY5zoe4YurRjw==',
                    'Accept':'application/json'
                  },
                  timeout:5000
                };
                var req = https.get(options, (res) => {
                    res.on('data', (d) => {
                        var resultdata = JSON.parse(d);
                        var callerid = resultdata.items[0].source.split('').join(' ');
                        var callername = resultdata.items[0].sourceAlias;
                        if (callername != "") {
                            callback(null, buildResponse({},buildSpeechletResponse("Test","Dein Letzter Anrufer war "+callername,"Next",true)));
                        } else {
                            callback(null, buildResponse({},buildSpeechletResponse("Test","Dein Letzter Anrufer hatte die Rufnummer "+callerid,"Next",true)));
                        }
                    });
                });
                req.on('error', (d) => {
                    callback(null, buildResponse({},buildSpeechletResponse("Test","Fehler","Next",true)));
                });
                req.end();
            } else if (event.request.intent.name=="GuthabenAbrufen") {
                var https = require('https');
                var options = {
                  hostname: 'api.sipgate.com',
                  port: 443,
                  path: '/v1/balance',
                  method: 'GET',
                  headers: {
                    'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpc1Rlc3RBY2NvdW50IjpmYWxzZSwic3ViIjoidzAiLCJwcm9kdWN0IjoidGVhbSIsImRvbWFpbiI6InNpcGdhdGUuZGUiLCJzY29wZSI6ImFsbCIsIm1hc3RlclNpcElkIjoiMzAwNjY0OSIsImZsYWdzIjpbXSwiaXNBZG1pbiI6dHJ1ZSwibG9jYWxlIjoiZGVfREUiLCJleHAiOjE0ODYwODA4NzYsImlhdCI6MTQ4NTk5NDQ3NiwianRpIjoiYjIyMDk3OTUtMzNhOC00OGEzLWE1MDEtMWI0MzZiYzE1NDUxIn0=.K0KQ4IRv_dS43d9f0Ff_9LtpI5W6r-d1DC0R_YAKbONJ3HtMGKvztizCCLblXLAmHu50PrKrCZY5zoe4YurRjw==',
                    'Accept':'application/json'
                  },
                  timeout:5000
                };
                var req = https.get(options, (res) => {
                    res.on('data', (d) => {
                        var resultdata = JSON.parse(d);
                        var euro = resultdata.amount/10000;
                        callback(null, buildResponse({},buildSpeechletResponse("Test","Dein Guthaben bei sipgate beträgt "+(Math.trunc(euro))+" Euro und "+(Math.trunc((euro-Math.trunc(euro))*100))+" cent","Next",true)));
                    });
                });
                req.on('error', (d) => {
                    callback(null, buildResponse({},buildSpeechletResponse("Test","Fehler","Next",true)));
                });
                req.end();

            } else if (event.request.intent.name=="VorwahlAnrufen") {
                var nummer = event.request.intent.slots.Telefonnummer.value;
                nummer = "0 "+ nummer.split('').join(' ');
                callback(null, buildResponse({},buildSpeechletResponse("Test","OK ich rufe jetzt "+nummer+" an!","Next",true)));
            } else if (event.request.intent.name=="DurchwahlAnrufen"){
                var nummer = event.request.intent.slots.Telefonnummer.value;
                nummer = nummer.split('').join(' ');
                callback(null, buildResponse({},buildSpeechletResponse("Test","OK ich rufe jetzt "+nummer+" an!","Next",true)));
            }
            //

        } else if (event.request.type === 'SessionEndedRequest') {
            /*onSessionEnded(event.request, event.session);
            callback();*/
        }
    } catch (err) {
        //callback(err);
    }
}
