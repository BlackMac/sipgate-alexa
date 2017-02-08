'use strict'

var Alexa = require('alexa-sdk')
var sipgate = require('./sipgate-rest')

var handlers = {

  'BalanceIntent': function () {
    const rest = sipgate(this.event.session.user.accessToken)
    rest.balance((res) => console.log(res))
    this.emit(':tell', 'Hello World!')
  }

}

exports.handler = function (event, context, callback) {
  var alexa = Alexa.handler(event, context)
  alexa.registerHandlers(handlers)
  alexa.execute()
}
